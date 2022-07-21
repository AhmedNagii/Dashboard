import React, { useEffect, useState } from 'react'
import DeleteModal from '../../Modals/delete modal/DeleteModal'
import FilterModal from '../../Modals/filter modal/FilterModal'
import ViewOptionModal from '../../Modals/vire options modal/ViewOptionModal'
import axios from './../../axios/axios'
import './user.css'
import AddUserModal from '../../Modals/add user modal/AddUserModal'
import UpdateUserModal from '../../Modals/update user modal/UpdateUserModal'


const Users = () => {
  const [deleteId, setdeleteId] = useState(0);
  const [updateData, setupdateData] = useState({});
  const [userName, setuserName] = useState(null)
  const [usersData, setusersData] = useState([]);

  const getUsersData = async () => {
    let { data } = await axios.get("/api/users");
    setusersData(data)
  }

  useEffect(() => {
    getUsersData();

  }, [])

  const handleDelete = (id,name) => {
    setdeleteId(id)
    setuserName(name)
  }

  const handleUpdate = (item) => {
   
    setupdateData({ name: item.name, email: item.email, username: item.username, password: item.password, phone: item.phone, country_id: item.country_id, role_id: item.role_id });
    setdeleteId(item.id)
  }

  const getRole = (role_id)=>{
    return role_id === 1 ? "admin" : "user" ;
  }

  const getCoutry = (country_id)=>{
    if(country_id === 1 || country_id ===2 ){
      return "Egypt"
    }
  }


  return (
    <div className='flex-grow-1 bg-main-content py-5 px-3 overflow-hidden'>

      <h2 className='text-main'>Users</h2>
      <div className='options d-flex justify-content-end'>
        <button className="btn  dropdown-toggle option-dropdown ms-2" type="button" data-bs-toggle="modal" data-bs-target="#viewOptionsModal" >
          View Options
        </button>
        <button className="btn dropdown-toggle ms-2 option-dropdown" type="button" data-bs-toggle="modal" data-bs-target="#filterModal">
          Filter
        </button>
        <ViewOptionModal columns={{
          name: "Columns",
          content: ["Address", "Phone Number", "No. of Partners", "Person-in-charge", "Billing Address", "Shipping Address", "Created By", "Last Modified By"]
        }} />

        <FilterModal filterby={[{ name: "Role", content: ["Admin", "Teacher", "Country Partner"] }, { name: "Country", content: ["Egypt", "China", "USA"] }, { name: "Status", content: ["Disabled", "Enabled"] }]} />

      </div>
      <div className='d-flex justify-content-between mt-2 align-items-center'>
        <div className='d-flex'>
          <button className='add-btn shadow-sm py-1 px-3' data-bs-toggle="modal" data-bs-target="#addUserModal"><i className='fas fa-plus'></i> Add New User</button>
          <AddUserModal getUsersData={getUsersData} />
          <button className='approve-btn shadow-sm py-1 px-3 ms-3'><i className="fa-solid fa-user-check"></i> Mass Enable User</button>
          <button className='approve-btn shadow-sm py-1 px-3 ms-3'><i className="fa-solid fa-user-large-slash"></i>Mass Disable User</button>
          <button className='delete-btn shadow-sm py-1 px-3 ms-3'><i className='fas fa-trash'></i> Mass Delete</button>
        </div>
        <div className='border-b-main'>
          <i className='fas fa-magnifying-glass text-main'></i>
          <input className='input-transparent px-5 ' type="text" placeholder='Search for Organisation' />
        </div>
      </div>
      <div className='mt-3 position-relative'>
        <div className='overflow-auto'>
          <table className='w-100 '>
            <thead className='bg-main'>
              <tr>
                <td></td>
                <td>Name</td>
                <td>Role</td>
                <td>Country</td>
                <td>Permission Overridden?</td>
                <td>Email</td>
                <td>Created By</td>
                <td>Last Modified By</td>
                <td>Last Login</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {
                usersData && usersData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td>{item.name}
                      <div className='users__icons'>
                        <i className="fa-solid fa-pen-to-square me-2" data-bs-toggle="modal" data-bs-target="#updateUserModal" onClick={() => handleUpdate(item)}></i>
                        <UpdateUserModal  deleteId={deleteId} getUsersData={getUsersData} updateData={updateData} />
                        <i className="fa-solid fa-trash me-2" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> handleDelete(item.id,item.name)}></i>
                        <DeleteModal id={deleteId} deleteData={{ type: "a user", content: userName, deletePoint: `/api/users/` }} fetchData={getUsersData} />
                        {/* <i className="fa-solid fa-user-check me-2 enabled-icon" data-bs-toggle="modal" data-bs-target="#approveModal"></i>
                        <ApproveModal approveData={{ type: "a user", content: "Lorem, ipsum." }} />
                        <Link className='text-black' to={"/dashboard/manage-users/user-permissions"}>
                          <i className="fa-solid fa-eye me-2"></i>
                        </Link> */}
                      </div>
                    </td>
                    <td>{getRole(item.role_id)}</td>
                    <td>{getCoutry(item.country_id)}</td>
                    <td>{item.permission_by_role}</td>
                    <td>{item.email}</td>
                    <td>{item.created_by} at {item.created_at}</td>
                    <td>{item.updated_by} at {item.updated_at}</td>
                    <td>{item.login}</td>
                    <td>{item.status}</td>
                    {/* <td><span className="status-btn disabled">Disabled</span></td> */}
                  </tr>
                ))
              }



            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users