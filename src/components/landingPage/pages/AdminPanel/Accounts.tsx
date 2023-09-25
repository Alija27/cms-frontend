import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteModal } from '../../../shared/modals/DeleteModal'
import { getAllAccounts, createAccount, updateAccount, deleteAccount } from '../../../../app/feature/Account/AccountApi'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllUsers } from '../../../../app/feature/User/UserApi'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'





export const Accounts = () => {
  const authState=useAppSelector((store)=>store.AuthSlice);
  const dispatch = useAppDispatch();
  const accountState = useAppSelector((store) => store.AccountSlice);
  const userState = useAppSelector((store) => store.UserSlice);
  const courseState = useAppSelector((store) => store.CourseSlice);

  //display all Accountes
  useEffect(() => {
    dispatch(getAllAccounts(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers({role:"student"}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourses(null));
  }, [dispatch]);
  //display modal to add a new Account
  const [showAddModal, setShowAddModal] = useState(false);

  //select Account to edit
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedAccount(null);
    reset();
  }


  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        user_id: yup.string().required("User is required"),
        total_fees: yup.string().required("Total fees is required"),
        paid_fees: yup.string().required("Paid fees is required"),
        course_id: yup.string().required("Course is required"),
      })
    ),
  })

  useEffect(() => {
    if (selectedAccount) {
      setValue("user_id", selectedAccount?.user_id);
      setValue("total_fees", selectedAccount?.total_fees);
      setValue("paid_fees", selectedAccount?.paid_fees);
      setValue("course_id", selectedAccount?.course_id);

    }
  }, [selectedAccount, setValue]);
  const onsubmit = async (data: any) => {
    if (selectedAccount) {
      await dispatch(updateAccount({ data, id: selectedAccount?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
    else {
      await dispatch(createAccount(data)).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
  };

  const handleCourseChange = (option: any, actionMeta: any) => {
    setValue("course_id", option.value);
  }

   const handleUserChange = (option: any, actionMeta: any) => {
    setValue("user_id", option.value);
  }

  const handleDelete = async () => {
    await dispatch(deleteAccount(selectedAccount?.id)).then((res: any) => {
      if (res.payload.success) {
        onCancelDeleteModal();
        reset();
        setSelectedAccount(null);
      }
    });
  };
  const onCancelDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedAccount(null);
    reset();
  }

  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Accounts"
            rightheading={
            
            
           
            <Buttons
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
                    <th>User</th>
                    <th>Total Fees</th>
                    <th>Paid Fees</th>
                    <th>Remaining Fees</th>
                    <th>Course</th>
                   {/*  <th>Actions</th> */}

                  </tr>
                </THead>
                <TBody>
                  {accountState.accounts.map((account: any, index) => (
                    <tr key={account?.id}>
                      <td>{index + 1}</td>
                      <td>{account?.user_name}</td>
                      <td>{account?.total_fees}</td>
                      <td>{account?.paid_fees}</td>
                      <td>{account?.remaining_fees}</td>
                      <td>{account?.course_name}</td>
                     {/*  <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedAccount(account);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedAccount(account);
                            setShowDeleteModal(true);

                          }} />
                        </div>
                      </TableActions> */}

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
            {selectedAccount ? "Edit Account" : "Add Account"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>
              <SelectInput
                register={register}
                error={errors?.user_id?.message}
                name="user_id"
                options={userState.getAllUsers.users.map((user: any) => ({
                  label: user?.user_name,
                  value: user?.id,
                }))
                }
                onChange={handleUserChange}


              />
              <TextFields
                register={register}
                error={errors?.total_fees?.message}
                name="total_fees"
                type="number"
                placeholder="Enter total fees here"
                label="Total Fees" />

              <TextFields
                register={register}
                error={errors?.paid_fees?.message}
                name="paid_fees"
                type="number"
                placeholder="Enter paid fees here"
                label="Paid Fees" />

              <SelectInput
                register={register}
                error={errors?.course_id?.message}
                name="course_id"
                options={courseState.courses.map((course: any) => ({
                  label: course?.course_name,
                  value: course?.id,
                }))
                }
                onChange={handleCourseChange}


              />


            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedAccount ? `Update` : `Add`}`} type="submit" className="dashboardlink" />
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
