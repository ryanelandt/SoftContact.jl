
function fill_with_nothing!(a)  # TODO: find more elegant way to do this
    for k = keys(a)
        a[k] = nothing
    end
    return nothing
end

@inline mat_mul_SA_bug_circumvent(A::SMatrix{4,4,Float64,16}, B::SMatrix{4,4,Float64,16}) = A * B
@inline mat_mul_SA_bug_circumvent(A::SMatrix{4,4,T,16}, B::SMatrix{4,4,T,16}) where {T} = StaticArrays.mul_loop(Size(A), Size(B), A, B)
@inline mat_mul_SA_bug_circumvent(A::SMatrix{4,4,Float64,16}, B::SMatrix{4,4,T,16}) where {T} = StaticArrays.mul_loop(Size(A), Size(B), A, B)
@inline mat_mul_SA_bug_circumvent(A::SMatrix{4,4,T,16}, B::SMatrix{4,4,Float64,16}) where {T} = StaticArrays.mul_loop(Size(A), Size(B), A, B)

function add_h_mesh_color(h_mesh::HomogenousMesh; color::Union{Nothing, RGBA{Float32}}=nothing)
    return HomogenousMesh(vertices=h_mesh.vertices, faces=h_mesh.faces, color=color)
end

findMesh(mech_scen::MechanismScenario, name::String) = findMesh(mech_scen.MeshCache, name)
findMesh(ts::TempContactStruct, name::String) = findMesh(ts.MeshCache, name)
findMesh(ts::MeshCacheDict{MeshCache}, name::String) = ts[findmesh(ts, name)]

function Radau_for_MechanismScenario(m::MechanismScenario{NX,NQ,Dual{Type_Tag,Float64,NC}}) where {NX,NQ,Type_Tag,NC}
    return RadauIntegrator{MechanismScenario, NX, 3, NC}(1.0e-16, m)
end
