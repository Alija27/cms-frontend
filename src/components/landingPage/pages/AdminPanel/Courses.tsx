import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteModal } from '../../../shared/modals/DeleteModal'
import Buttons from '../../../shared/buttons/Buttons'
import Layout from '../../../shared/dashboard/Layout'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect } from 'react'
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../../../../app/feature/Course/CourseApi'
import Select from 'react-select/dist/declarations/src/Select'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllDepartments } from '../../../../app/feature/Department/DepartmentApi'

export const Courses = () => {
    const dispatch = useAppDispatch();
    const coursestate = useAppSelector((store) => store.CourseSlice);
    const departmentState = useAppSelector((store) => store.DepartmentSlice);
    //display all courses
    useEffect(() => {
        dispatch(getAllCourses(null));
    }, [dispatch]);
    
    //display all departments
    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    //display modal to add a new course
    const [showAddModal, setShowAddModal] = useState(false);
    //select course to edit
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    //delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const onCancel = () => {
        setShowAddModal(false);
        setSelectedCourse(null);
        reset();
    }
    //form data submit
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
                course_name: yup.string().required(),
                department_id: yup.string().required(),
                fees: yup.string().required(),
            })
        ),
    })
    useEffect(() => {
        if (selectedCourse) {
            setValue("course_name", selectedCourse?.course_name);
            setValue("department_id", selectedCourse?.department.id);
            setValue("fees", selectedCourse?.fees);
            
        }
    }, [selectedCourse, setValue]);
    const onsubmit = async (data: any) => {
        if (selectedCourse) {
            await dispatch(updateCourse({ data, id: selectedCourse?.id })).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedCourse(null);
                    reset();
                }   
            });
        } else {
            await dispatch(createCourse(data)).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedCourse(null);
                    reset();
                }
            });
        }
    }

    const hanadleDepartmentChange = (option:any,actionMeta:any) => {
        setValue("department_id", option.value);
    } 
    //delete course
    const handleDelete = async () => {
      console.log(selectedCourse);
        await dispatch(deleteCourse(selectedCourse?.id)).then((res: any) => {
            if (res.payload.success) {
                setShowDeleteModal(false);
                setSelectedCourse(null);
            }
        });
    }
    const onCancelDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedCourse(null);
    }
    
    
    
    
  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Courses"
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
                    <th>Department</th>
                    <th>Fees</th>
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {coursestate.courses.map((course: any, index) => (
                    <tr key={course?.id}>
                      <td>{index + 1}</td>
                      <td>{course?.course_name}</td>
                      <td>{course?.department?.name}</td>
                      <td>{course?.fees}</td>
                      <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedCourse(course);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedCourse(course);
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
            {selectedCourse ? "Edit course" : "Add course"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>

              <TextFields
                register={register}
                error={errors?.course_name?.message}
                name="course_name"
                type="text"
                placeholder="Enter course name here"
                label="Name" />

                <SelectInput
                name="department_id"
                register={register}
                onChange={hanadleDepartmentChange}
                error={errors?.department_id?.message}
                options={departmentState.departments.map((department: any) => ({
                  label: department.name,
                  value: department.id
                }))}
                defaultValue= {selectedCourse ? {value:selectedCourse?.department.id,label:selectedCourse?.department.name }:""}
              />
              <TextFields
                register={register}
                error={errors?.fees?.message}
                name="fees"
                type="number"
                placeholder="Enter your fees here"
                label="Fees" />

                
                  


                


            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedCourse ? `Update` : `Add`}`} type="submit" className="dashboardlink" />
            </ModalFooter>
          </form>
        </Modal>)
        : ""}
      {showDeleteModal ? (
        <DeleteModal>
          <button className="bg-red-500 text-white px-3 py-2 rounded-md" onClick={handleDelete}>Delete</button>
          <button className="bg-gray-500 text-white px-3 py-2 rounded-md" onClick={onCancelDeleteModal}>Cancel</button>
        </DeleteModal>
      ) : ""}
    
    </>
  )
}
