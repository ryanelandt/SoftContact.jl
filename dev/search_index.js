var documenterSearchIndex = {"docs":
[{"location":"#PressureFieldContact-1","page":"Home","title":"PressureFieldContact","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This module implements the elastic foundation-themed contact model for rigid body dynamics described in this short video. This paper describes the method in greater detail.","category":"page"},{"location":"#Index-1","page":"Home","title":"Index","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"quick_start/#Quick-Start-1","page":"Quickstart guide","title":"Quick-Start","text":"","category":"section"},{"location":"quick_start/#Install-Atom-1","page":"Quickstart guide","title":"Install Atom","text":"","category":"section"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"Atom is an IDE for languages including Julia. You will install Julia as the first step of the Atom installation. Install Atom by following the instructions here.","category":"page"},{"location":"quick_start/#Install-PressureFieldContact-1","page":"Quickstart guide","title":"Install PressureFieldContact","text":"","category":"section"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"Paste the following code into a text file ending in .jl and save it. Open this file in ATOM and then press ctrl + shift + enter to run the file and install PressureFieldContact and the necessary dependencies.","category":"page"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"using Pkg\nPkg.add(\"PressureFieldContact\")","category":"page"},{"location":"quick_start/#Run-example-1","page":"Quickstart guide","title":"Run example","text":"","category":"section"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"Go to the examples section and run one of the examples.","category":"page"},{"location":"geometry/#Geometry-1","page":"Geometry","title":"Geometry","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"This contact implementation represents rigid objects with triangular meshes and compliant objects with tetrahedral meshes. This package uses the custom geometry data type eMesh. Convenience functions to create meshes for common shapes are documented below.","category":"page"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"Modules = [PressureFieldContact.Geometry]\nOrder   = [:type]\nPages   = [\"mesh.jl\"]","category":"page"},{"location":"geometry/#PressureFieldContact.Geometry.eMesh","page":"Geometry","title":"PressureFieldContact.Geometry.eMesh","text":"struct eMesh{T1<:Union{Nothing, Tri}, T2<:Union{Nothing, Tet}}\n\nData structure for holding geometry data.\n\n\n\n\n\n","category":"type"},{"location":"geometry/#Basic-Shapes-1","page":"Geometry","title":"Basic Shapes","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"output_eMesh_box\noutput_eMesh_sphere\noutput_eMesh_half_plane","category":"page"},{"location":"geometry/#PressureFieldContact.Geometry.output_eMesh_box","page":"Geometry","title":"PressureFieldContact.Geometry.output_eMesh_box","text":"output_eMesh_box()\noutput_eMesh_box(r)\noutput_eMesh_box(r, c)\n\n\nOutputs an eMesh for a box.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#PressureFieldContact.Geometry.output_eMesh_sphere","page":"Geometry","title":"PressureFieldContact.Geometry.output_eMesh_sphere","text":"output_eMesh_sphere()\noutput_eMesh_sphere(rad)\noutput_eMesh_sphere(rad, n_div)\n\n\nOutputs an eMesh for a sphere. Larger values of n_div create finer discretizations.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#PressureFieldContact.Geometry.output_eMesh_half_plane","page":"Geometry","title":"PressureFieldContact.Geometry.output_eMesh_half_plane","text":"output_eMesh_half_plane()\noutput_eMesh_half_plane(plane_w)\noutput_eMesh_half_plane(plane_w, is_include_vis_sides)\n\n\nOutputs an eMesh for a half-plane.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#Swept-Meshes-1","page":"Geometry","title":"Swept Meshes","text":"","category":"section"},{"location":"geometry/#Rotationally-Symmetric-Meshes-1","page":"Geometry","title":"Rotationally Symmetric Meshes","text":"","category":"section"},{"location":"geometry/#Mesh-from-an-STL-file-1","page":"Geometry","title":"Mesh from an STL file","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"For an example of this this example:","category":"page"},{"location":"friction/#Friction-1","page":"Friction","title":"Friction","text":"","category":"section"},{"location":"friction/#","page":"Friction","title":"Friction","text":"This model has two contact models. The first is a smooth version on Coulomb friction. The second is a bristle-type friction model.","category":"page"},{"location":"friction/#Add-friction-1","page":"Friction","title":"Add friction","text":"","category":"section"},{"location":"friction/#","page":"Friction","title":"Friction","text":"add_friction_regularize!\nadd_friction_bristle!","category":"page"},{"location":"friction/#PressureFieldContact.add_friction_regularize!","page":"Friction","title":"PressureFieldContact.add_friction_regularize!","text":"add_friction_regularize!(m, mesh_id_1, mesh_id_2; μs, μd, χ, v_tol)\n\n\nAdds regularized friction to a scenario.\n\n\n\n\n\n","category":"function"},{"location":"friction/#PressureFieldContact.add_friction_bristle!","page":"Friction","title":"PressureFieldContact.add_friction_bristle!","text":"add_friction_bristle!(m, mesh_id_1, mesh_id_c; τ, k̄, μs, μd, χ)\n\n\nAdds bristle friction to a scenario.\n\n\n\n\n\n","category":"function"},{"location":"mechanism_scenario/#MechanismScenario-1","page":"MechanismScenario","title":"MechanismScenario","text":"","category":"section"},{"location":"mechanism_scenario/#","page":"MechanismScenario","title":"MechanismScenario","text":"MechanismScenario","category":"page"},{"location":"mechanism_scenario/#PressureFieldContact.MechanismScenario","page":"MechanismScenario","title":"PressureFieldContact.MechanismScenario","text":"mutable struct MechanismScenario{NQ, T}\n\nA MechanismScenario contains contact information for an entire mechanism.\n\nType parameters:\n\nNQ: quadrature rule number\nT: the ForwardDiff.Dual scalar type\n\n\n\n\n\n","category":"type"},{"location":"polygon_clipping/#Polygon-clipping-1","page":"Polygon clipping","title":"Polygon clipping","text":"","category":"section"},{"location":"polygon_clipping/#","page":"Polygon clipping","title":"Polygon clipping","text":"Modules = [PressureFieldContact.Clip]\nOrder   = [:function]","category":"page"},{"location":"polygon_clipping/#PressureFieldContact.Clip.clip_in_tet_coordinates-Union{Tuple{poly_eight{4,T}}, Tuple{T}} where T","page":"Polygon clipping","title":"PressureFieldContact.Clip.clip_in_tet_coordinates","text":"Calls clip\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.clip_plane_tet-Union{Tuple{T}, Tuple{SArray{Tuple{1,4},T,2,4},SArray{Tuple{4,4},T,2,16}}} where T","page":"Polygon clipping","title":"PressureFieldContact.Clip.clip_plane_tet","text":"clip_plane_tet(plane, tet)\n\n\nClips a plane by a tetrahedron. The plane takes the form of a static row matrix The tet takes the form of a static matrix\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.getTetQuadRule-Tuple{Int64}","page":"Polygon clipping","title":"PressureFieldContact.Clip.getTetQuadRule","text":"getTetQuadRule(n_rule)\n\n\nOutputs the Yu tetrahedron quadrature rules from the Python package quadpy.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.getTriQuadRule-Tuple{Int64}","page":"Polygon clipping","title":"PressureFieldContact.Clip.getTriQuadRule","text":"getTriQuadRule(n_rule)\n\n\nOutputs the XiaoGimbutas triangle quadrature rules from the Python package quadpy.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.zero_small_coordinates-Union{Tuple{poly_eight{4,T}}, Tuple{T}} where T","page":"Polygon clipping","title":"PressureFieldContact.Clip.zero_small_coordinates","text":"zero_small_coordinates(p)\n\n\nSets small coondinates of a polygon in tetrahedral coordinates to zero. This function addresses a specific probability one degeneracy that results when clipping an edge in the same place twice.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.clip-Union{Tuple{T}, Tuple{SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},Int64}} where T","page":"Polygon clipping","title":"PressureFieldContact.Clip.clip","text":"Together with cut_clip, implements the clipping of polygons by tetrahedra using the Sutherland–Hodgman algorithm. The Sutherland-Hodgman algorithm essentially clips a polygon by one plane at a time. You should not call this function directly. Clipped polygons are assumed to have at most 8 sides. This implementation should correctly handle the case where 2 of fewer vertices lie exactly on a plane.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.cut_clip-Union{Tuple{T}, Tuple{SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},Int64}} where T","page":"Polygon clipping","title":"PressureFieldContact.Clip.cut_clip","text":"cut_clip(z1, z2, z3, i)\n\n\nRemoves a non-positive vertex from a polygon.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.NumericalTricks.centroid-Union{Tuple{T}, Tuple{poly_eight{3,T},SArray{Tuple{3},T,1,3}}} where T","page":"Polygon clipping","title":"PressureFieldContact.NumericalTricks.centroid","text":"centroid(p_new, n̂)\n\n\nFinds the centroid of a 3 dimensional poly_eight by dividing the area into triangles. This funciton requires a reference normal n̂.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.NumericalTricks.mul_then_un_pad-Union{Tuple{T2}, Tuple{T1}, Tuple{SArray{Tuple{4,4},T1,2,16},poly_eight{4,T2}}} where T2 where T1","page":"Polygon clipping","title":"PressureFieldContact.NumericalTricks.mul_then_un_pad","text":"mul_then_un_pad(m, p)\n\n\nMultiplies a 4 dimensional polygon by a 4x4 matrix and then unpads the 4 dimensional polygon. This function is used to convert a polygon in tetrahedral coordinates to a polygon in Cartesian coordinates.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.NumericalTricks.one_pad_then_mul-Union{Tuple{T2}, Tuple{T1}, Tuple{SArray{Tuple{4,4},T1,2,16},poly_eight{3,T2}}} where T2 where T1","page":"Polygon clipping","title":"PressureFieldContact.NumericalTricks.one_pad_then_mul","text":"one_pad_then_mul(m, p)\n\n\nOne pads each element of a 3 dimensional polygon and then multiplies it by a 4x4 matrix m. This funciton is used to convert each element of a Cartesian polygon into tetrahedral coordinates.\n\n\n\n\n\n","category":"method"},{"location":"algorithms/#Algorithms-1","page":"Algorithms","title":"Algorithms","text":"","category":"section"},{"location":"algorithms/#Functions-1","page":"Algorithms","title":"Functions","text":"","category":"section"},{"location":"algorithms/#","page":"Algorithms","title":"Algorithms","text":"calcXd!","category":"page"},{"location":"algorithms/#PressureFieldContact.calcXd!","page":"Algorithms","title":"PressureFieldContact.calcXd!","text":"calcXd!(xx, x, m, tm, t)\n\nConventions: n̂ refers to the contact surface normal that points into body B v_cart refers to + velocity of B - the velocity of A the wrench is the wrench applied TO body A\n\n\n\n\n\n","category":"function"}]
}
