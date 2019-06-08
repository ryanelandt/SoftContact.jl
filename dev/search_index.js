var documenterSearchIndex = {"docs":
[{"location":"#PressureFieldContact-1","page":"Home","title":"PressureFieldContact","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This module implements the elastic foundation-themed contact model for rigid body dynamics described in this short video. This paper describes the method in greater detail.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This model was originally designed to model contact robotic manipulation tasks, and can model a variety of contacts including non-convex contacts. Compared to point contact it is accurate and slow. Compared to FEM it is inaccurate and fast.","category":"page"},{"location":"#Index-1","page":"Home","title":"Index","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"quick_start/#Quick-Start-1","page":"Quickstart guide","title":"Quick-Start","text":"","category":"section"},{"location":"quick_start/#Install-Atom-1","page":"Quickstart guide","title":"Install Atom","text":"","category":"section"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"Atom is an IDE for languages including Julia. You will install Julia as the first step of the Atom installation. Install Atom by following the instructions here.","category":"page"},{"location":"quick_start/#Install-PressureFieldContact-1","page":"Quickstart guide","title":"Install PressureFieldContact","text":"","category":"section"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"Paste the following code into a text file ending in .jl and save it. Open this file in ATOM and then press ctrl + shift + enter to run the file and install PressureFieldContact and the necessary dependencies.","category":"page"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"using Pkg\nPkg.add(\"PressureFieldContact\")","category":"page"},{"location":"quick_start/#Run-example-1","page":"Quickstart guide","title":"Run example","text":"","category":"section"},{"location":"quick_start/#","page":"Quickstart guide","title":"Quickstart guide","text":"Go to the examples section and run one of the examples.","category":"page"},{"location":"geometry/#Geometry-1","page":"Geometry","title":"Geometry","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"This contact implementation represents rigid objects with triangular meshes and compliant objects with tetrahedral meshes. This package uses the custom geometry data type eMesh. Convenience functions to create meshes for common shapes are documented below.","category":"page"},{"location":"geometry/#eMesh-Data-Type-1","page":"Geometry","title":"eMesh Data Type","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"Modules = [PressureFieldContact.Geometry]\nOrder   = [:type]\nPages   = [\"mesh.jl\"]","category":"page"},{"location":"geometry/#PressureFieldContact.Geometry.eMesh","page":"Geometry","title":"PressureFieldContact.Geometry.eMesh","text":"struct eMesh{T1<:Union{Nothing, Tri}, T2<:Union{Nothing, Tet}}\n\nData structure for holding geometry data.\n\n\n\n\n\n","category":"type"},{"location":"geometry/#Simple-Shapes-1","page":"Geometry","title":"Simple Shapes","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"eMesh_box\neMesh_sphere\neMesh_half_plane\neMesh_cylinder","category":"page"},{"location":"geometry/#PressureFieldContact.Geometry.eMesh_box","page":"Geometry","title":"PressureFieldContact.Geometry.eMesh_box","text":"eMesh_box()\neMesh_box(r)\neMesh_box(r, c)\n\n\nOutputs an eMesh for a box.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#PressureFieldContact.Geometry.eMesh_sphere","page":"Geometry","title":"PressureFieldContact.Geometry.eMesh_sphere","text":"eMesh_sphere()\neMesh_sphere(rad)\neMesh_sphere(rad, n_div)\n\n\nOutputs an eMesh for a sphere. Larger values of n_div create finer discretizations.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#PressureFieldContact.Geometry.eMesh_half_plane","page":"Geometry","title":"PressureFieldContact.Geometry.eMesh_half_plane","text":"eMesh_half_plane()\neMesh_half_plane(plane_w)\neMesh_half_plane(plane_w, is_include_vis_sides)\n\n\nOutputs an eMesh for a half-plane.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#PressureFieldContact.Geometry.eMesh_cylinder","page":"Geometry","title":"PressureFieldContact.Geometry.eMesh_cylinder","text":"eMesh_cylinder()\neMesh_cylinder(rad)\neMesh_cylinder(rad, height; n)\n\n\nOutputs an eMesh for a cylinder.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#Swept-Meshes-1","page":"Geometry","title":"Swept Meshes","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"create_swept_mesh\nf_swept_triv\nf_swept_circle","category":"page"},{"location":"geometry/#PressureFieldContact.Geometry.create_swept_mesh","page":"Geometry","title":"PressureFieldContact.Geometry.create_swept_mesh","text":"create_swept_mesh(fun_gen, lr, rad)\ncreate_swept_mesh(fun_gen, lr, rad, n_side)\ncreate_swept_mesh(fun_gen, lr, rad, n_side, is_open; rot_half)\n\n\nCreates a mesh by sweeping a 3D path for the given inputs:\n\nfun_gen: function that takes a single input arc length and outputs 1.) the position on path, 2.) a single direction normal to path and 3.) direction along the path.\nlr: arc length locations of nodes on path\nrad: thickness of swept mesh\nn_side: number of sides of swept path\nis_open: if the path starts and ends at the same point (e.g. ring) set this to false\nrot_half: if the sides of the path are \"off\" set this to false\n\n\n\n\n\n","category":"function"},{"location":"geometry/#PressureFieldContact.Geometry.f_swept_triv","page":"Geometry","title":"PressureFieldContact.Geometry.f_swept_triv","text":"f_swept_triv(θ)\n\n\nStraight path for a swept mesh. Pass this to create_swept_mesh to make a basic swept mesh.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#PressureFieldContact.Geometry.f_swept_circle","page":"Geometry","title":"PressureFieldContact.Geometry.f_swept_circle","text":"f_swept_circle(r, θ)\n\n\nCircular path for a swept mesh. Specify the radius by evaluating it ahead of time. For example, define my_circle(θ) = f_swept_circle(0.1, θ), and then pass my_circle to create_swept_mesh.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#Rotationally-Symmetric-Meshes-1","page":"Geometry","title":"Rotationally Symmetric Meshes","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"","category":"page"},{"location":"geometry/#Mesh-from-an-STL-file-1","page":"Geometry","title":"Mesh from an STL file","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"For an example of this this example:","category":"page"},{"location":"geometry/#Transforming-Meshes-1","page":"Geometry","title":"Transforming Meshes","text":"","category":"section"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"transform!","category":"page"},{"location":"geometry/#PressureFieldContact.Geometry.transform!","page":"Geometry","title":"PressureFieldContact.Geometry.transform!","text":"transform!(e_mesh, extra_args)\n\n\nCreates a transformation matrix by creating a basic_dh from extra_arguments and then transforms the eMesh. See basic_dh for how to create common transformation types. Reflections are not allowed.\n\n\n\n\n\n","category":"function"},{"location":"geometry/#","page":"Geometry","title":"Geometry","text":"basic_dh","category":"page"},{"location":"geometry/#PressureFieldContact.MathKernel.basic_dh","page":"Geometry","title":"PressureFieldContact.MathKernel.basic_dh","text":"struct basic_dh{T}\n\nA matrix used to represent any transformation for eMesh and homogenous transformations for dynamics. The invert method for this object assumes that the matrix corresponds to a homogenous transform. Common transformation types and how to make them:\n\ntranslate 1.0 in x: basic_dh(SVector(1.0, 0.0, 0.0))\nrotate pi/2 about z: basic_dh(RotZ(pi/2))\nscale each axis by 2.0: basic_dh(2.0)\nscale x axis by 2.0: basic_dh(Diagonal(SVector(2.0, 1.0, 1.0)))\nrotate by R and translate by t: basic_dh(R, t)\n\n\n\n\n\n","category":"type"},{"location":"friction/#Add-Contact/Friction-1","page":"Add Contact/Friction","title":"Add Contact/Friction","text":"","category":"section"},{"location":"friction/#","page":"Add Contact/Friction","title":"Add Contact/Friction","text":"This page explains how to take geometry and as eMesh and make it engage in contact. This process has two steps: 1.) add the eMesh to the contact geometries and 2.) add friction pairs to contact geometry pairs.","category":"page"},{"location":"friction/#Add-Contact-1","page":"Add Contact/Friction","title":"Add Contact","text":"","category":"section"},{"location":"friction/#","page":"Add Contact/Friction","title":"Add Contact/Friction","text":"add_body_contact!\nadd_contact!\nadd_body!\nas_tri_eMesh\nas_tet_eMesh","category":"page"},{"location":"friction/#PressureFieldContact.add_body_contact!","page":"Add Contact/Friction","title":"PressureFieldContact.add_body_contact!","text":"add_body_contact!(m, name, e_mesh; i_prop, c_prop, body, joint, dh)\n\n\nCreates a body with the contact geometry and inertia specified by the inputs. Internally, this function calls add_contact! and add_body!.\n\n\n\n\n\n","category":"function"},{"location":"friction/#PressureFieldContact.add_contact!","page":"Add Contact/Friction","title":"PressureFieldContact.add_contact!","text":"add_contact!(m, name, e_mesh; c_prop, body)\n\n\nAdds contact geometry without creating a new body. In addition to being used by other functions, this function allows you to add contact geometry to an imported mechanism, or add multiple contact geometries to a single body.\n\n\n\n\n\n","category":"function"},{"location":"friction/#PressureFieldContact.add_body!","page":"Add Contact/Friction","title":"PressureFieldContact.add_body!","text":"add_body!(m, name, e_mesh; i_prop, body, joint, dh)\n\n\nAdds a body to the mechanism with whose inertia properties are those of the contact geometry in e_mesh and inertia properties in i_prop. In addition to being used by other functions, this function is helpful to create bodies with specific inertia properties in an intuitive manner.\n\n\n\n\n\n","category":"function"},{"location":"friction/#PressureFieldContact.Geometry.as_tri_eMesh","page":"Add Contact/Friction","title":"PressureFieldContact.Geometry.as_tri_eMesh","text":"as_tri_eMesh(e_mesh)\nas_tri_eMesh(e_mesh, is_repair)\n\n\nConverts an eMesh to a mesh that contains only triangles. You need to do this before adding an eMesh as contact geometry.\n\n\n\n\n\n","category":"function"},{"location":"friction/#PressureFieldContact.Geometry.as_tet_eMesh","page":"Add Contact/Friction","title":"PressureFieldContact.Geometry.as_tet_eMesh","text":"as_tet_eMesh(e_mesh)\n\n\nConverts an eMesh to a mesh that contains only tetrahedrons. You need to do this before adding an eMesh as contact geometry.\n\n\n\n\n\n","category":"function"},{"location":"friction/#Add-Friction-1","page":"Add Contact/Friction","title":"Add Friction","text":"","category":"section"},{"location":"friction/#","page":"Add Contact/Friction","title":"Add Contact/Friction","text":"Friction applies between user-selected contact pairs. This model has two friction contact models. The first is a piece-wise linear regularization of Coulomb friction. The second is a 6-DOF bristle friction model.","category":"page"},{"location":"friction/#","page":"Add Contact/Friction","title":"Add Contact/Friction","text":"add_friction_regularize!\nadd_friction_bristle!","category":"page"},{"location":"friction/#PressureFieldContact.add_friction_regularize!","page":"Add Contact/Friction","title":"PressureFieldContact.add_friction_regularize!","text":"add_friction_regularize!(m, mesh_id_1, mesh_id_2; μs, μd, χ, v_tol, n_quad_rule)\n\n\nAdds regularized friction to a scenario. Returns the added contact instruction.\n\n\n\n\n\n","category":"function"},{"location":"friction/#PressureFieldContact.add_friction_bristle!","page":"Add Contact/Friction","title":"PressureFieldContact.add_friction_bristle!","text":"add_friction_bristle!(m, mesh_id_1, mesh_id_c; τ, k̄, μs, μd, χ, n_quad_rule)\n\n\nAdds bristle friction to a scenario. Returns the added contact instruction.\n\n\n\n\n\n","category":"function"},{"location":"mechanism_scenario/#MechanismScenario-1","page":"MechanismScenario","title":"MechanismScenario","text":"","category":"section"},{"location":"mechanism_scenario/#","page":"MechanismScenario","title":"MechanismScenario","text":"MechanismScenario\nfinalize!","category":"page"},{"location":"mechanism_scenario/#PressureFieldContact.MechanismScenario","page":"MechanismScenario","title":"PressureFieldContact.MechanismScenario","text":"mutable struct MechanismScenario{T}\n\nA MechanismScenario contains contact information for an entire mechanism.\n\nType parameters:\n\nT: the ForwardDiff.Dual scalar type\n\n\n\n\n\n","category":"type"},{"location":"mechanism_scenario/#PressureFieldContact.finalize!","page":"MechanismScenario","title":"PressureFieldContact.finalize!","text":"Calculates MechanismScenario information needed for simulation.\n\n\n\n\n\n","category":"function"},{"location":"algorithms/#Algorithms-1","page":"Algorithms","title":"Algorithms","text":"","category":"section"},{"location":"algorithms/#Functions-1","page":"Algorithms","title":"Functions","text":"","category":"section"},{"location":"algorithms/#","page":"Algorithms","title":"Algorithms","text":"calcXd!","category":"page"},{"location":"algorithms/#PressureFieldContact.calcXd!","page":"Algorithms","title":"PressureFieldContact.calcXd!","text":"calcXd!(xx, x, m, tm, t)\n\nConventions: n̂ refers to the contact surface normal that points into body B v_cart refers to + velocity of B - the velocity of A the wrench is the wrench applied TO body B\n\n\n\n\n\n","category":"function"},{"location":"polygon_clipping/#Polygon-Clipping-1","page":"Polygon Clipping","title":"Polygon Clipping","text":"","category":"section"},{"location":"polygon_clipping/#","page":"Polygon Clipping","title":"Polygon Clipping","text":"The average user will not need to look at this page.","category":"page"},{"location":"polygon_clipping/#","page":"Polygon Clipping","title":"Polygon Clipping","text":"Modules = [PressureFieldContact.Clip]\nOrder   = [:function]","category":"page"},{"location":"polygon_clipping/#PressureFieldContact.Clip.clip_in_tet_coordinates-Union{Tuple{poly_eight{4,T}}, Tuple{T}} where T","page":"Polygon Clipping","title":"PressureFieldContact.Clip.clip_in_tet_coordinates","text":"Calls clip\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.clip_plane_tet-Union{Tuple{T}, Tuple{SArray{Tuple{1,4},T,2,4},SArray{Tuple{4,4},T,2,16}}} where T","page":"Polygon Clipping","title":"PressureFieldContact.Clip.clip_plane_tet","text":"clip_plane_tet(plane, tet)\n\n\nClips a plane by a tetrahedron. The plane takes the form of a static row matrix The tet takes the form of a static matrix\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.getTetQuadRule-Tuple{Int64}","page":"Polygon Clipping","title":"PressureFieldContact.Clip.getTetQuadRule","text":"getTetQuadRule(n_rule)\n\n\nOutputs the Yu tetrahedron quadrature rules from the Python package quadpy.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.getTriQuadRule-Tuple{Int64}","page":"Polygon Clipping","title":"PressureFieldContact.Clip.getTriQuadRule","text":"getTriQuadRule(n_rule)\n\n\nOutputs the XiaoGimbutas triangle quadrature rules from the Python package quadpy.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.zero_small_coordinates-Union{Tuple{poly_eight{4,T}}, Tuple{T}} where T","page":"Polygon Clipping","title":"PressureFieldContact.Clip.zero_small_coordinates","text":"zero_small_coordinates(p)\n\n\nSets small coondinates of a polygon in tetrahedral coordinates to zero. This function addresses a specific probability one degeneracy that results when clipping an edge in the same place twice.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.clip-Union{Tuple{T}, Tuple{SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},Int64}} where T","page":"Polygon Clipping","title":"PressureFieldContact.Clip.clip","text":"clip(z1, z2, z3, i)\n\n\nTogether with cut_clip, implements the clipping of polygons by tetrahedra using the Sutherland–Hodgman algorithm. The Sutherland-Hodgman algorithm essentially clips a polygon by one plane at a time. You should not call this function directly. Clipped polygons are assumed to have at most 8 sides. This implementation should correctly handle the case where 2 of fewer vertices lie exactly on a plane.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.Clip.cut_clip-Union{Tuple{T}, Tuple{SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},SArray{Tuple{4},T,1,4},Int64}} where T","page":"Polygon Clipping","title":"PressureFieldContact.Clip.cut_clip","text":"Removes a non-positive vertex from a polygon.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.MathKernel.centroid-Union{Tuple{T}, Tuple{poly_eight{3,T},SArray{Tuple{3},T,1,3}}} where T","page":"Polygon Clipping","title":"PressureFieldContact.MathKernel.centroid","text":"centroid(p_new, n̂)\n\n\nFinds the centroid of a 3 dimensional poly_eight by dividing the area into triangles. This funciton requires a reference normal n̂.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.MathKernel.mul_then_un_pad-Union{Tuple{T2}, Tuple{T1}, Tuple{SArray{Tuple{4,4},T1,2,16},poly_eight{4,T2}}} where T2 where T1","page":"Polygon Clipping","title":"PressureFieldContact.MathKernel.mul_then_un_pad","text":"mul_then_un_pad(m, p)\n\n\nMultiplies a 4 dimensional polygon by a 4x4 matrix and then unpads the 4 dimensional polygon. This function is used to convert a polygon in tetrahedral coordinates to a polygon in Cartesian coordinates.\n\n\n\n\n\n","category":"method"},{"location":"polygon_clipping/#PressureFieldContact.MathKernel.one_pad_then_mul-Union{Tuple{T2}, Tuple{T1}, Tuple{SArray{Tuple{4,4},T1,2,16},poly_eight{3,T2}}} where T2 where T1","page":"Polygon Clipping","title":"PressureFieldContact.MathKernel.one_pad_then_mul","text":"one_pad_then_mul(m, p)\n\n\nOne pads each element of a 3 dimensional polygon and then multiplies it by a 4x4 matrix m. This funciton is used to convert each element of a Cartesian polygon into tetrahedral coordinates.\n\n\n\n\n\n","category":"method"}]
}
