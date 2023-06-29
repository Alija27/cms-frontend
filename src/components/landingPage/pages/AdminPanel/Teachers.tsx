import React from 'react'
import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { TeacherSlice } from '../../../../app/feature/Teacher/TeacherSlice'
import { getAllTeachers } from '../../../../app/feature/Teacher/TeacherApi'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'


const Teachers = () => {
    const dispatch = useAppDispatch();
    const teacherState = useAppSelector((store) => store.TeacherSlice);

    useEffect(() => {
        dispatch(getAllTeachers());
    }, [dispatch]);

    const [showAddModal, setShowAddModal] = useState(false);

    const onCancel = () => {
        setShowAddModal(false);
    }


    return (
        <>
            <Layout>
                <div className="w-full">
                    <TableLayout heading="Teachers"
                        rightheading={<Buttons
                            text="Add New"
                            type="button"
                            className="dashboardlink"
                            onClick={() => {
                                console.log("Button clicked");
                                setShowAddModal(true)
                            }}
                        />}>
                        <div >
                            <Table >
                                <THead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Name</th>

                                    </tr>
                                </THead>
                                <TBody>
                                    {teacherState.getAllTeachers.teachers.map((teacher: any, index) => (
                                        <tr key={teacher.id}>
                                            <td>{index + 1}</td>
                                            <td>{teacher.name}</td>


                                            <TableActions></TableActions>

                                        </tr>
                                    ))}
                                </TBody>
                            </Table>
                        </div>
                    </TableLayout>
                </div>
            </Layout>
            {showAddModal ? (
                <Modal >
                    <ModalHeader>
                        Add User
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col space-y-4">
                            <TextFields
                                name="name"
                                type="text"
                                placeholder="Enter your name here"
                                label="Name"/>

                            <TextFields
                                name="email"
                                type="email"
                                placeholder="Enter your email here"
                                label="Email"/>

                                
                            <TextFields
                                name="password"
                                type="password"
                                placeholder="Enter your password here"
                                label="Password"/>

                            <TextFields
                                name="address"
                                type="text"
                                placeholder="Enter your address here"
                                label="Address"/>

                            <TextFields
                                name="phonenumber"
                                type="text"
                                placeholder="Enter your phone here"
                                label="Phone"/>

                            <TextFields
                                name="date_of_birth"
                                type="date"
                                placeholder="Enter your date of birth here"
                                label="Date of Birth"/> 
                                 

                        </form>
                    </ModalBody>
                    <ModalFooter className="justify-end">
                        <Buttons text="Cancel" type="submit" className="bg-gray-500"
                        onClick={onCancel}
                        />
                        <Buttons text="Save" type="submit" className="dashboardlink" />
                    </ModalFooter>
                </Modal>)
                : ""}
        </>



    )
}

export default Teachers