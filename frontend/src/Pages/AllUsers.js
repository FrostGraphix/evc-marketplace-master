import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {
  const [allUser, setAllUser] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUser(dataResponse.data)
    }
    if (dataResponse.eror) {
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#FF6700] text-white uppercase text-left">
              <th className="py-3 px-4 font-medium">Sr.</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Role</th>
              <th className="py-3 px-4 font-medium">Location</th>
              <th className="py-3 px-4 font-medium">Hostel</th>
              <th className="py-3 px-4 font-medium">Area</th>
              <th className="py-3 px-4 font-medium">Created</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allUser.map((el, index) => (
              <tr key={el._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{el?.name}</td>
                <td className="py-3 px-4 break-all">{el?.email}</td>
                <td className="py-3 px-4 capitalize">{el?.role}</td>
                <td className="py-3 px-4">{el?.location || '—'}</td>
                <td className="py-3 px-4">{el?.hostel || '—'}</td>
                <td className="py-3 px-4">{el?.area || '—'}</td>
                <td className="py-3 px-4">{moment(el?.createdAt).format('LL')}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-emerald-100 text-[#FF6700] p-2 rounded-full shadow-sm 
                              hover:bg-emerald-200 hover:text-emerald-900 transition-colors"
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}
                  >
                    <MdModeEdit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openUpdateRole && (
        <ChangeUserRole 
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers} // refresh users after role update
        />
      )}
    </div>
  )
}

export default AllUsers
