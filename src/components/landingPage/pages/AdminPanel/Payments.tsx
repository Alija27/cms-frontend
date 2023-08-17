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
import { getAllPayments, createPayment, updatePayment, deletePayment } from '../../../../app/feature/Payment/PaymentApi'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllUsers } from '../../../../app/feature/User/UserApi'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'
import { getAllAccounts } from '../../../../app/feature/Account/AccountApi'





export const Payments = () => {

  const dispatch = useAppDispatch();
  const paymentState = useAppSelector((store) => store.PaymentSlice);
  const userState = useAppSelector((store) => store.UserSlice);
  const courseState = useAppSelector((store) => store.CourseSlice);
  const accountState = useAppSelector((store) => store.AccountSlice);
 //select user
 const[selectedUser,setSelectedUser]=useState<any>(null);

  //display all Paymentes
  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers({role:"student"}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourses(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllAccounts(selectedUser));
  }, [dispatch,selectedUser]);
  //display modal to add a new Payment
  const [showAddModal, setShowAddModal] = useState(false);

  //select Payment to edit
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

 

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedPayment(null);
    reset();
  }

  const onCancelDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPayment(null);
    reset();
  }
  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        user_id: yup.string().required("User is required"),
        account_id: yup.string().required("Account is required"),
        amount: yup.string().required("Amount is required"),
        payment_date: yup.date().required("Payment Date is required"),
        payment_method: yup.string().required("Payment Method is required"),

      })
    ),
  })

  useEffect(() => {
    if (selectedPayment) {
      setValue("user_id", selectedPayment?.user_id);
      setValue("account_id", selectedPayment?.account_id);
      setValue("amount", selectedPayment?.amount);
      setValue("payment_date", selectedPayment?.payment_date);
      setValue("payment_method", selectedPayment?.payment_method);

    }
  }, [selectedPayment, setValue]);
  const onsubmit = async (data: any) => {
    if (selectedPayment) {
      await dispatch(updatePayment({ data, id: selectedPayment?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
    else {
      await dispatch(createPayment(data)).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
  };

  const handleAccountChange = (option: any, actionMeta: any) => {
    setValue("account_id", option.value);
  }

  const handleUserChange = (option: any, actionMeta: any) => {
    console.log(option.value);
    setSelectedUser(option.value)
    setValue("user_id", option.value);
  }

  const handleDelete = async () => {
    await dispatch(deletePayment(selectedPayment?.id)).then((res: any) => {
      if (res.payload.success) {
        setShowDeleteModal(false);
        reset();
        setSelectedPayment(null);
        
      }
    });
  };
  

  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Payments"
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
                    <th>User</th>
                    <th>Account</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Payment Date</th>
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {paymentState.payments.map((payment: any, index) => (
                    <tr key={payment?.id}>
                      <td>{index + 1}</td>
                      <td>{payment?.user.user_name}</td>
                      <td>{payment?.account.course_name}</td>
                      <td>{payment?.amount}</td>
                      <td>{payment?.payment_method}</td>
                      <td>{payment?.payment_date}</td>
                      <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedPayment(payment);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedPayment(payment);
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
            {selectedPayment ? "Edit Payment" : "Add Payment"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>
              <SelectInput
                register={register}
                error={errors?.user_id?.message}
                name="user_id"
                options={userState.getAllUsers.users.map((user: any) => ({
                  label: user?.user_name + " " + "(" + user?.guardian_name + ")",
                  value: user?.id,
                }))
                }
                onChange={handleUserChange}


              />
{(selectedUser && setSelectedUser.length > 0) &&
              <SelectInput
                register={register}
                error={errors?.account_id?.message}
                name="account_id"
                options={accountState.accounts.map((account: any) => ({
                  label: account?.user_name + " " + "(" + account?.guardian_name + ")",
                  value: account?.id,
                }))
                }
                onChange={handleAccountChange}


              />


}


              <TextFields
                register={register}
                error={errors?.amount?.message}
                name="amount"
                type="number"
                placeholder="Enter Amount"
                label='Amount'
              />


              <TextFields
                register={register}
                error={errors?.payment_method?.message}
                name="payment_method"
                type="text"
                placeholder="Enter Payment Method"
                label='Payment Method'
              />

              <TextFields
                register={register}
                error={errors?.payment_date?.message}
                name="payment_date"
                type="date"
                placeholder="Enter Payment Date"
                label='Payment Date'
              />



            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedPayment ? `Update` : `Add`}`} type="submit" className="dashboardlink" />
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
