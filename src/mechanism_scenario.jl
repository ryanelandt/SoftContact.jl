
struct TractionCache{N,T}
    traction_normal::FreeVector3D{SVector{3,T}}
    r_cart::NTuple{N,Point3D{SVector{3,T}}}
    v_cart_t::NTuple{N,FreeVector3D{SVector{3,T}}}
    p_dA::NTuple{N,T}
    function TractionCache(traction_normal::FreeVector3D{SVector{3,T}}, r_cart::NTuple{N,Point3D{SVector{3,T}}},
        v_cart_t::NTuple{N,FreeVector3D{SVector{3,T}}}, p_dA::NTuple{N,T}) where {N,T}

        return new{N,T}(traction_normal, r_cart, v_cart_t, p_dA)
    end
    function TractionCache(N, T)  # TODO: delete this when vector cache only works for immutables
        frame = FRAME_ζ²

        traction_normal = FreeVector3D(frame, SVector{3, T}(NaN .+ zeros(3)))
        r_cart = NTuple{N,Point3D{SVector{3,T}}}([Point3D(frame, SVector{3,T}(NaN, NaN, NaN)) for k = 1:N])
        v_cart_t = NTuple{N,FreeVector3D{SVector{3,T}}}([FreeVector3D(frame, SVector{3,T}(NaN, NaN, NaN)) for k = 1:N])
        p_dA = NTuple{N,T}(NaN .+ zeros(N))
        return new{N,T}(traction_normal, r_cart, v_cart_t, p_dA)
    end
end

mutable struct TypedElasticBodyBodyCache{N,T}
    frame_world::CartesianFrame3D
    quad::TriTetQuadRule{3,N}
    TractionCache::VectorCache{TractionCache{N,T}}
    mesh_1::MeshCache
    mesh_2::MeshCache
    x_rʷ_r¹::Transform3D{T}
    x_rʷ_r²::Transform3D{T}
    x_r²_rʷ::Transform3D{T}
    x_r¹_rʷ::Transform3D{T}
    twist_r¹_r²::Twist{T}
    χ::Float64
    μ::Float64
    Ē::Float64
    d⁻¹::Float64
    wrench::Wrench{T}
    function TypedElasticBodyBodyCache{N,T}(frame_world::CartesianFrame3D, quad::TriTetQuadRule{3,N}) where {N,T}
        tc = TractionCache(N, T)
        trac_cache = VectorCache(tc)
        return new{N,T}(frame_world, quad, trac_cache)
    end
end

struct TypedMechanismScenario{N,T}
    state::MechanismState{T}
    s::SegmentedVector{BristleID,T,Base.OneTo{BristleID},Array{T,1}}
    result::DynamicsResult{T}
    ṡ::SegmentedVector{BristleID,T,Base.OneTo{BristleID},Array{T,1}}
    f_generalized::Vector{T}
    bodyBodyCache::TypedElasticBodyBodyCache{N,T}
    GeometricJacobian::RigidBodyDynamics.CustomCollections.CacheIndexDict{BodyID,Base.OneTo{BodyID},Union{Nothing,GeometricJacobian{Array{T,2}}}}
    frame_world::CartesianFrame3D  # TODO: does this need to be here?
    function TypedMechanismScenario{N,T}(mechanism::Mechanism, quad::TriTetQuadRule{3,N}, v_path, body_ids,
            n_bristle_pairs::Int64) where {N,T}

        function makeJacobian(v_path, state::MechanismState{T}, body_ids::Base.OneTo{BodyID}) where {T}
            v_jac = RigidBodyDynamics.BodyCacheDict{Union{Nothing,GeometricJacobian{Array{T,2}}}}(body_ids)
            fill_with_nothing!(v_jac)
            for (body_id_k, path_k) = v_path
                if path_k != nothing  # body has no meshes attached to it
                    if body_id_k != BodyID(root_body(state.mechanism))
                        new_jac = geometric_jacobian(state, path_k)
                        new_jac.linear .= NaN
                        new_jac.angular .= NaN
                        v_jac[body_id_k] = new_jac
                    end
                end
            end
            return v_jac
        end
        function_Int64_six(k) = 6

        state = MechanismState{T}(mechanism)
        result = DynamicsResult{T}(mechanism)
        f_generalized = Vector{T}(undef, num_positions(mechanism))
        frame_world = root_frame(mechanism)
        bodyBodyCache = TypedElasticBodyBodyCache{N,T}(frame_world, quad)
        v_jac = makeJacobian(v_path, state, body_ids)
        n_dof_bristle = 6 * n_bristle_pairs
        s = SegmentedVector{BristleID}(zeros(T, n_dof_bristle), Base.OneTo(BristleID(n_bristle_pairs)), function_Int64_six)
        ṡ = SegmentedVector{BristleID}(zeros(T, n_dof_bristle), Base.OneTo(BristleID(n_bristle_pairs)), function_Int64_six)
        return new{N,T}(state, s, result, ṡ, f_generalized, bodyBodyCache, v_jac, root_frame(mechanism))
    end
end

function makePaths(mechanism::Mechanism, mesh_cache::MeshCacheDict{MeshCache}, body_ids::Base.OneTo{BodyID})
    the_type = Union{Nothing,RigidBodyDynamics.Graphs.TreePath{RigidBody{Float64},Joint{Float64,JT} where JT<:JointType{Float64}}}
    v_path = RigidBodyDynamics.BodyDict{the_type}(body_ids)
    fill_with_nothing!(v_path)
    for mesh_k = values(mesh_cache)
        body_id = mesh_k.BodyID
        if body_id != BodyID(root_body(mechanism))
            v_path[body_id] = path(mechanism, root_body(mechanism), bodies(mechanism)[body_id])
        end
    end
    return v_path
end

struct MechanismScenario{NQ,NX,T}
    n_dof::Int64
    body_ids::Base.OneTo{BodyID}
    mesh_ids::Base.OneTo{MeshID}
    bristle_ids::Base.OneTo{BristleID}
    frame_world::CartesianFrame3D
    TT_Cache::TT_Cache
    τ_ext::Vector{Float64}
    float::TypedMechanismScenario{NQ,Float64}
    dual::TypedMechanismScenario{NQ,T}
    path::RigidBodyDynamics.CustomCollections.IndexDict{BodyID,Base.OneTo{BodyID},Union{Nothing,RigidBodyDynamics.Graphs.TreePath{RigidBody{Float64},Joint{Float64,JT} where JT<:JointType{Float64}}}}
    MeshCache::RigidBodyDynamics.CustomCollections.CacheIndexDict{MeshID,Base.OneTo{MeshID},MeshCache}
    ContactInstructions::Vector{ContactInstructions}
    de::Function
    function MechanismScenario(ts::TempContactStruct, de::Function; n_quad_rule::Int64=2, N_chunk::Int64=12)
        (1 <= n_quad_rule <= 2) || error("only quadrature rules 1 (first order) and 2 (second? order) are currently implemented")
        quad = getTriQuadRule(n_quad_rule)
        N = length(quad.w)

        mechanism = ts.mechanism
        body_ids = Base.OneTo(last(bodies(mechanism)).id)
        mesh_ids = ts.mesh_ids
        bristle_ids = ts.bristle_ids
        n_bristle_pairs = length(bristle_ids)

        n_positions = num_positions(mechanism)
        n_velocities = num_velocities(mechanism)
        (n_positions == n_velocities) || error("n_positions ($n_positions) and n_velocities ($n_velocities) are different. Replace QuaternionFloating joints with SPQuatFloating joints.")

        n_dof = n_positions + n_velocities + 6 * n_bristle_pairs

        T = Dual{Nothing,Float64,N_chunk}
        frame_world = root_frame(mechanism)
        τ_ext = zeros(Float64, num_positions(mechanism))
        mesh_cache = ts.MeshCache
        cache_path = makePaths(mechanism, mesh_cache, body_ids)
        cache_float = TypedMechanismScenario{N,Float64}(mechanism, quad, cache_path, body_ids, n_bristle_pairs)
        cache_dual = TypedMechanismScenario{N,T}(mechanism, quad, cache_path, body_ids, n_bristle_pairs)
        vec_instructions = ts.ContactInstructions
        return new{N,n_dof,T}(n_dof, body_ids, mesh_ids, bristle_ids, frame_world, TT_Cache(), τ_ext, cache_float, cache_dual, cache_path, mesh_cache, vec_instructions, de)
    end
end

num_partials(m::MechanismScenario{NQ,NX,Dual{Nothing,Float64,N_partials}}) where {NQ,NX,N_partials} = N_partials
num_x(m::MechanismScenario{NQ,NX,T}) where {NQ,NX,T} = NX
type_dual(m::MechanismScenario{NQ,NX,T}) where {NQ,NX,T} = T

function get_state(mech_scen::MechanismScenario)
    x = zeros(num_partials(mech_scen))
    copyto!(x, mech_scen.float)
    return x
end

function set_state_spq!(mech_scen::MechanismScenario, joint::Joint; rot::Rotation=one(Quat{Float64}),
        trans::SVector{3,Float64}=zeros(SVector{3,Float64}), w::SVector{3,Float64}=zeros(SVector{3,Float64}),
        vel::SVector{3,Float64}=zeros(SVector{3,Float64}))

    rot = components(SPQuat(rot))
    state = mech_scen.float.state
    set_configuration!(state, joint, vcat(rot, trans))
    set_velocity!(state, joint, vcat(w, vel))
    return nothing
end
