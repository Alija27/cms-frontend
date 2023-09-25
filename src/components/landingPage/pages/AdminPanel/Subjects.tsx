import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteModal } from '../../../shared/modals/DeleteModal'
import Buttons from '../../../shared/buttons/Buttons'
import { RxCross2 } from 'react-icons/rx'
import Layout from '../../../shared/dashboard/Layout'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { getAllSubjects, createSubject, deleteSubject, updateSubject } from '../../../../app/feature/Subject/SubjectApi'
import { HeaderModal, ViewModal } from '../../../shared/modals/ViewModal'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'
import {SelectInput} from '../../../shared/inputs/SelectInput'
import { getAllSemesters } from '../../../../app/feature/Semester/SemesterApi'

const Subject = () => {
    const authState = useAppSelector((store) => store.AuthSlice);
    const dispatch = useAppDispatch();
    const SubjectState = useAppSelector((store) => store.SubjectSlice);
    const courseState = useAppSelector((store) => store.CourseSlice);
    const semesterState = useAppSelector((store) => store.SemesterSlice);

    useEffect(() => {
        dispatch(getAllCourses(null));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllSemesters());
    }, [dispatch]);

    //display all subjects
    useEffect(() => {
        dispatch(getAllSubjects(null));
    }, [dispatch,courseState,semesterState]);

   
    

    //display modal to add a new subject
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<any>(null);

const [showViewModal, setShowViewModal] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
                subject_name: yup.string().required(),
                course_id: yup.string().required(),
                semester_id: yup.string().required(),
                subject_code: yup.string().required(),
                publication: yup.string().required(),
                    

            })
        ),
    })

    
    useEffect(() => {

        if (selectedSubject) {
            setValue("subject_name", selectedSubject?.subject_name);
            setValue("course_id", selectedSubject?.course_id);
            setValue("semester_id", selectedSubject?.semester_id);
            setValue("subject_code", selectedSubject?.subject_code);
            setValue("publication", selectedSubject?.publication);
        }
    }, [selectedSubject, setValue])

    

    const onsubmit = async (data: any) => {
        console.log(data);
        if (selectedSubject) {
            await dispatch(updateSubject({ data, id: selectedSubject?.id })).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedSubject(null);
                    
                    reset();
                }
            });
        } else {
            await dispatch(createSubject(data)).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                  
                   
                    reset();
                }
            });
        }
    }

    const handleCourseChange = (option: any, actionMeta: any) => {
        console.log(option);
        setValue("course_id", option.value);
    }
    const onCancel = () => {
        setShowAddModal(false);
        setSelectedSubject(null);
        reset();
    }

    const onCancelDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const handleDelete = async () => {
        console.log("delete");
        console.log(selectedSubject);
        dispatch(deleteSubject(selectedSubject?.id)).then((res: any) => {
            if (res.payload.success) {
                setShowDeleteModal(false);
                setSelectedSubject(null);
            }
        })

    }

    const handleSemesterChange = (option: any, actionMeta: any) => {
        console.log(option);
        setValue("semester_id", option.value);
       
    }
    
    const onCancelViewModal = () => {
        setShowViewModal(false);
        setSelectedSubject(null);
    }

    return (
        <>
            <Layout>
                <div className="w-full">
                    <TableLayout heading="Subjects"

                        rightheading={
                        
                            authState.current_user?.roles.includes("admin") &&

                        <Buttons
                            text="Add New"
                            type="button"
                            className="dashboardlink"
                            onClick={() => {
                                setShowAddModal(true);
                            }
                            }

                        />
                    }>
                        <div >
                            <Table >
                                <THead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Semester</th>
                                        <th>Subject Code</th>
                                        <th>Publication</th>
                                        {authState.current_user?.roles.includes("admin") &&(<th>Actions</th>)}
                                        

                                    </tr>
                                </THead>
                                <TBody>
                                    {SubjectState.subjects.map((subject: any, index) => (
                                        <tr key={subject?.id}>
                                            <td>{index + 1}</td>
                                            <td>{subject?.subject_name}</td>
                                            <td>{subject?.course_name}</td>
                                            <td>{subject?.semester_name}</td>
                                            <td>{subject?.subject_code}</td>
                                            <td>{subject?.publication}</td>
                                            {authState.current_user?.roles.includes("admin") &&(

                                            <TableActions>
                                                {/* <div className="hover:text-green-800">
                                                    <FaEye size={20} onClick={() => {
                                                        setSelectedSubject(subject)
                                                        setShowViewModal(true)
                                                    }} />
                                                </div> */}
                                                <div className="hover:text-blue-800">
                                                    <FaEdit size={20} onClick={() => {
                                                        { setSelectedSubject(subject) }
                                                        setShowAddModal(true);
                                                    }} />
                                                </div>

                                                <div className="hover:text-red-800">
                                                    <AiFillDelete size={20} onClick={() => {
                                                        setSelectedSubject(subject)
                                                        setShowDeleteModal(true)
                                                    }} />
                                                </div>
                                            </TableActions>
                                            )}
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
                        {selectedSubject ? "Edit Subject" : " Add Subjects"}
                    </ModalHeader>
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
                        <ModalBody>
                            <TextFields
                                register={register}
                                error={errors.subject_name?.message}  
                                name="subject_name"
                                type="text"
                                placeholder="Enter subject name here"
                                label="Subject Name" />
                                
                                <SelectInput
                                 text="Course"
                                 register={register}
                                 error={errors.course_id?.message}
                                  name="course_id"
                                  options={courseState.courses.map((course:any)=>({
                                  value:course.id,
                                  label:course.course_name
                                 }))}
                                 onChange={handleCourseChange}
                                 defaultValue={selectedSubject? { value: selectedSubject.course_id, label: selectedSubject.course_name} : ''}
                                
                                />
                                <SelectInput
                                    text="Semester"
                                 register={register}
                                    error={errors.semester_id?.message}
                                    name="semester_id"
                                    
                                    options={semesterState.semesters.map((semester:any)=>({
                                    value:semester.id,
                                    label:semester.name
                                    }))}
                                    defaultValue={selectedSubject? { value: selectedSubject.semester_id, label: selectedSubject.semester_name} : ''
                                }
                                    onChange={handleSemesterChange}
                                    
                                />
                                <TextFields
                                register={register}
                                error={errors.subject_code?.message}
                                name="subject_code"
                                type="text"
                                placeholder="Enter subject code here"
                                label="Subject Code" />

                                <TextFields
                                register={register}
                                error={errors.publication?.message}
                                name="publication"
                                type="text"
                                placeholder="Enter publication here"
                                label="Publication" />
                                
                        </ModalBody>
                        <ModalFooter className="justify-end">
                         <Buttons text="Cancel" type="submit" className="bg-gray-500"
                                onClick={() => { onCancel() }}
                            /> 
                            <Buttons text={`${selectedSubject ? "Edit" : "Add"}`} type="submit" className="dashboardlink" onClick={()=>{"clicked"}}/>
                        </ModalFooter>
                    </form>
                </Modal>)
                : ""}
            {showDeleteModal ? (
                <DeleteModal>
                    <button className="bg-red-500 text-white px-3 py-2 rounded-md" onClick={handleDelete}>Delete</button>
                    <button className="bg-gray-500 text-white px-3 py-2 rounded-md" onClick={onCancelDeleteModal} >Cancel</button>
                </DeleteModal>
            ) : ""}

            {showViewModal ? (
                <div>
                    <ViewModal>
                        <HeaderModal heading="Subject Details">
                            <RxCross2 size={20} onClick={() => {
                                onCancelViewModal();
                            }} />

                        </HeaderModal>
                        <div className="flex flex-col space-y-4">
                            <div className="mt-1">
                                <label className="block text-gray-600">Name</label>
                                <p className="text-gray-900">{selectedSubject?.name}</p>
                                
                            </div>
                        </div>
                    </ViewModal>
                </div>
            ) : ""}

        </>
    )
}

export default Subject