module SoftContact

using RigidBodyDynamics
using StaticArrays
using Tri_Tet_Intersections
using Binary_BB_Trees


include("material.jl")
include("mesh_cache.jl")
include("mesh_inertia.jl")

export
    # material.jl
    ContactMaterialProperties,
    InertiaMaterialProperties,
    MaterialProperties,

    # mesh_cache.jl
    RawMeshCache,
    MeshDict,
    MeshCacheDict,
    MeshCache,

    # mesh_inertia.jl
    makeInertiaTensor,
    centroidVolumeCombo,
    equiv_volume
end
