import React from 'react'
import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect } from 'react'
import { getAllUsers } from "../../../../app/feature/User/UserApi"
import { UserSlice } from "../../../../app/feature/User/UserSlice"
import { Modal, ModalBody } from '../../../shared/modals/Modal'
import { ModalHeader } from '../../../shared/modals/Modal'
import { ModalFooter } from '../../../shared/modals/Modal'

const Users = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((store) => store.UserSlice);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <Layout>
            <div className="w-full">
                <TableLayout heading="Users" rightheading={<Buttons text="Add New" type="button" className="dashboardlink" />}>
                    <div >
                        <Table >
                            <THead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Date_of_birth</th>
                                    <th>Actions</th>
                                </tr>
                            </THead>
                            <TBody>
                                {userState.getAllUsers.users.map((user: any, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phonenumber}</td>
                                        <td>{user.date_of_birth}</td>
                                        <TableActions></TableActions>

                                    </tr>
                                ))}
                            </TBody>
                        </Table>
                    </div>
                </TableLayout>
            </div>
            {/* <Modal>
                <ModalHeader>
                    Add User
                </ModalHeader>
                <ModalBody>
                    <form className="flex flex-col space-y-4">

                    </form>
                </ModalBody>
                <ModalFooter className="justify-end">
                    <Buttons text="Cancel" type="submit" className="bg-gray-500" />
                    <Buttons text="Save" type="submit" className="dashboardlink" />
                </ModalFooter>
            </Modal> */}
        </Layout>
    )
}

export default Users