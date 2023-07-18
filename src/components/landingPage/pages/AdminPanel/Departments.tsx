import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../../../../app/feature/Department/DepartmentApi'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteModal } from '../../../shared/modals/DeleteModal'


export const Departments = () => {

  const dispatch = useAppDispatch();
  const departmentState = useAppSelector((store) => store.DepartmentSlice);

  //display all departments
  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);


  //display modal to add a new department
  const [showAddModal, setShowAddModal] = useState(false);

  //select department to edit
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedDepartment(null);
    reset();
  }


  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
      })
    ),
  })

  useEffect(() => {
    if (selectedDepartment) {
      setValue("name", selectedDepartment?.name);
    }
  }, [selectedDepartment, setValue]);
  const onsubmit = async (data: any) => {
    if (selectedDepartment) {
      await dispatch(updateDepartment({ data, id: selectedDepartment?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
    else {
      await dispatch(createDepartment(data)).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
  };

  

  const handleDelete = async () => {
    await dispatch(deleteDepartment(selectedDepartment?.id)).then((res: any) => {
      if (res.payload.success) {
        onCancelDeleteModal();
        reset();
        setSelectedDepartment(null);
      }
    });
  };
  const onCancelDeleteModal= () => {
    setShowDeleteModal(false);
    setSelectedDepartment(null);
  }

  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Departments"
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
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {departmentState.departments.map((department: any, index) => (
                    <tr key={department?.id}>
                      <td>{index + 1}</td>
                      <td>{department?.name}</td>
                      <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedDepartment(department);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedDepartment(department);
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
            {selectedDepartment ? "Edit Department" : "Add Department"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>

              <TextFields
                register={register}
                error={errors?.name?.message}
                name="name"
                type="text"
                placeholder="Enter your name here"
                label="Name" />


            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedDepartment ? `Update` : `Add`}`} type="submit" className="dashboardlink" />
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
