import React from 'react'
import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { DeleteModal } from '../../../shared/modals/DeleteModal'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllSemesters } from '../../../../app/feature/Semester/SemesterApi'
import { getAllDepartments } from '../../../../app/feature/Department/DepartmentApi'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { getAllSubjects } from '../../../../app/feature/Subject/SubjectApi'
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../../../../app/feature/Student/StudentApi'
import { getAllBatches } from '../../../../app/feature/Batch/BatchApi'


const Students = () => {
    const dispatch = useAppDispatch();
    const studentState = useAppSelector((store) => store.StudentSlice);
    const departmentState = useAppSelector((store) => store.DepartmentSlice);
    const courseState = useAppSelector((store) => store.CourseSlice);
    const batchState = useAppSelector((store) => store.BatchSlice);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);


   
    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllBatches());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getAllCourses(selectedDepartment));
    }, [dispatch, selectedDepartment]);
    useEffect(() => {
        dispatch(getAllStudents(null));
    }, [dispatch]);


    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const onCancel = () => {
        setShowAddModal(false);
        setSelectedStudent(null);
        reset();
    }

    const onCancelDeleteModal = () => {
        setShowDeleteModal(false);
        reset();
    }

    const handleDelete = async () => {
        await dispatch(deleteStudent(selectedStudent?.id)).then((res: any) => {
            if (res.payload.success) {
                setShowDeleteModal(false);
                setSelectedStudent(null);
                reset();
            }
        })
    }



    const handleDepartmentChange = (option: any, actionMeta: any) => {
        console.log(option);    
        setSelectedDepartment(option.value);
        setValue("department_id",  option.value);
    }
    

    

    const handleCourseChange = (option: any, actionMeta: any) => {
        console.log(option);
        
        setValue("course_id", option.value);
    }

    const handleBatchChange = (option: any, actionMeta: any) => {
        console.log(option);
        setValue("batch_id", option.value);
    }

    const onsubmit = async (data: any) => {
        // set value of department_id, course_id, subject_id to what is selected in dropdown
        if (selectedStudent) {
            await dispatch(updateStudent({ data, id: selectedStudent?.id })).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedStudent(null);
                    reset();
                }
            });
        } else {
            await dispatch(createStudent(data)).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    reset();
                    getAllStudents(null);
                }
            });
        }
    }

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
                user_name: yup.string().required(),
                email: yup.string().required(),
                password: yup.string().required(),
                address: yup.string().required(),
                phonenumber: yup.string().required(),
                date_of_birth: yup.string().required(),
                guardian_name: yup.string().required(),
                guardian_phonenumber: yup.string().required(),
                gender: yup.string().required(),
                department_id: yup.string().required(),
                course_id: yup.string().required(),
                batch_id: yup.string().required(),
            })
        ),
    })

    useEffect(() => {

        if (selectedStudent) {
            console.log(selectedStudent)
            setSelectedDepartment(selectedStudent?.department.id);
            setValue("user_name", selectedStudent?.user_name);
            setValue("email", selectedStudent?.email);
            setValue("password", selectedStudent?.password);
            setValue("address", selectedStudent?.address);
            setValue("phonenumber", selectedStudent?.phonenumber);
            setValue("date_of_birth", selectedStudent?.date_of_birth);
            setValue("guardian_name", selectedStudent?.guardian_name);
            setValue("guardian_phonenumber", selectedStudent?.guardian_phonenumber);
            setValue("gender",selectedStudent?.gender);
            setValue("department_id", selectedStudent?.department.id);
            setValue("course_id", selectedStudent?.course.id);
            setValue("batch_id", selectedStudent?.batch.id);
        }
    }, [selectedStudent, setValue]);
    

    return (
        <>
            <Layout>
                <div className="w-full">
                    <TableLayout heading="Students"




                        rightheading={
                        <div className="flex gap-2">
                            <a href="students/course/">
                            <Buttons
                            text="View ByCourse"
                            type="button"
                            className="dashboardlink"
                           
                        />
                        </a>

                        <Buttons
                            text="Add New"
                            type="button"
                            className="dashboardlink"
                            onClick={() => {
                                console.log("Button clicked");
                                setShowAddModal(true)
                            }}
                        />
                        </div>}>
                        <div >
                            <Table >
                                <THead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Course</th>
                                        <th>Batch</th>
                                        <th>Guardian Name</th>
                                        <th>Action</th>


                                    </tr>
                                </THead>
                                <TBody>
                                    {studentState.students.map((student: any, index) => (
                                        <tr key={student?.id}>
                                            <td>{index + 1}</td>
                                            <td>{student?.user?.user_name}</td>
                                            <td>{student?.user?.email}</td>
                                            <td>{student?.department?.name}</td>
                                            <td>{student?.course?.course_name}</td>
                                            <td>{student?.batch?.year}</td>
                                            <td>{student?.user?.guardian_name}</td>
                                            <TableActions>
                                                <div className="hover:text-blue-800">
                                                    <FaEdit size={20} onClick={() => {
                                                        setSelectedStudent(student);
                                                        setShowAddModal(true);
                                                    }} />
                                                </div>
                                                <div className="hover:text-red-800">
                                                    <FaTrash size={20} onClick={() => {
                                                        setSelectedStudent(student);
                                                        setShowDeleteModal(true);

                                                    }} />
                                                </div>
                                            </TableActions>
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
                        {selectedStudent ? "Update User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)}>
                            <TextFields
                                name="user_name"
                                register={register}
                                type="text"
                                placeholder="Enter your name here"
                                error={errors.user_name?.message}
                                label="Name" />
                            <TextFields
                                name="email"
                                register={register}
                                type="email"
                                placeholder="Enter your email here"
                                error={errors.email?.message}
                                label="Email" />
                            <TextFields
                                name="password"
                                register={register}
                                type="password"
                                placeholder="Enter your password here"
                                error={errors.password?.message}
                                label="Password" />
                            <TextFields
                                name="address"
                                register={register}
                                type="text"
                                placeholder="Enter your address here"
                                error={errors.address?.message}
                                label="Address" />
                            <TextFields
                                name="phonenumber"
                                register={register}
                                type="text"
                                placeholder="Enter your phone here"
                                error={errors.phonenumber?.message}
                                label="Phone" />

                                <TextFields
                                name="guardian_name"
                                register={register}
                                type="text"
                                placeholder="Enter your guardian name here"
                                error={errors.guardian_name?.message}
                                label="Guardian Name" />

                                <TextFields
                                name="guardian_phonenumber"
                                register={register}
                                type="text"
                                placeholder="Enter your guardian phone here"
                                error={errors.guardian_phonenumber?.message}
                                label="Guardian Phone" />
                                <TextFields
                                name="gender"
                                register={register}
                                type="text"
                                placeholder="Enter gender  here"
                                error={errors.gender?.message}
                                label="Gender" />

                            <TextFields
                                name="date_of_birth"
                                register={register}
                                type="date"
                                placeholder="Enter your date of birth here"
                                error={errors.date_of_birth?.message}
                                label="Date of Birth" />


                            <SelectInput
                                text="Department"
                                name="department_id"
                                register={register}
                                options={departmentState.departments.map((department: any) => ({
                                    value: department.id,
                                    label: department.name
                                }))}
                                onChange={handleDepartmentChange}
                                error={errors.department_id?.message}
                                /*  defaultValue={selectedStudent ? selectedStudent?.department?.map((department: any) => ({
                                    value: department.id,
                                    label: department.name
                                    })) : []}  */
                               
                            />

                          
                                <SelectInput
                                    text="Course"
                                    name="course_id"
                                    register={register}
                                    options={courseState.courses.map((course: any) => ({
                                        value: course.id,
                                        label: course.course_name
                                    }))}
                                     /* defaultValue={selectedStudent ? selectedStudent?.course?.map((course: any) => ({
                                        value: course.id,
                                        label: course.course_name
                                    })) : []}  */
                                    onChange={handleCourseChange}
                                    error={errors.course_id?.message}
                                   
                                />

                           

        
                                <SelectInput
                                    name="batch_id"

                                    register={register}
                                    options={batchState.batches.map((batch: any) => ({
                                        value: batch.id,
                                        label: batch.year
                                    }))}
                                        text="Batch"
                                    onChange={handleBatchChange}
                                     /* defaultValue={selectedStudent ? selectedStudent?.batch?.map((batch: any) => ({
                                        value: batch.id,
                                        label: batch.year
                                    })) : []} *//>         
                            <ModalFooter className="justify-end">
                                <Buttons text="Cancel" type="submit" className="bg-gray-500"
                                    onClick={onCancel}
                                />
                                <Buttons text="Save" type="submit" className="dashboardlink" />
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </Modal>)
                : ""}

            {showDeleteModal ? (
                <DeleteModal>
                    <button className="bg-red-500 text-white px-3 py-2 rounded-md" onClick={handleDelete}>Delete</button>
                    <button className="bg-gray-500 text-white px-3 py-2 rounded-md" onClick={onCancelDeleteModal} >Cancel</button>
                </DeleteModal>
            ) : ""}
        </>



    )
}

export default Students