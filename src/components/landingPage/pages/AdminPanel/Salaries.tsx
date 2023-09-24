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
import { getAllSalaries, createSalary, updateSalary, deleteSalary } from '../../../../app/feature/Salary/SalaryApi'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllUsers } from '../../../../app/feature/User/UserApi'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'
import { getAllAccounts } from '../../../../app/feature/Account/AccountApi'





export const Salaries = () => {

  const dispatch = useAppDispatch();
  const salaryState = useAppSelector((store) => store.SalarySlice);
  const userState = useAppSelector((store) => store.UserSlice);
  const courseState = useAppSelector((store) => store.CourseSlice);
  const accountState = useAppSelector((store) => store.AccountSlice);
 //select user
 const[selectedUser,setSelectedUser]=useState<any>(null);

  //display all Salaryes
  useEffect(() => {
    dispatch(getAllSalaries());
  }, [dispatch]);

  useEffect(() => {
    const rolesToFetch = ["examiner"];
    dispatch(getAllUsers({ role: rolesToFetch }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourses(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllAccounts(selectedUser));
  }, [dispatch,selectedUser]);
  //display modal to add a new Salary
  const [showAddModal, setShowAddModal] = useState(false);

  //select Salary to edit
  const [selectedSalary, setSelectedSalary] = useState<any>(null);

 

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedSalary(null);
    reset();
  }

  const onCancelDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedSalary(null);
    reset();
  }
  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        user_id: yup.string().required("User is required"),
        month: yup.string().required("Month is required"),
        year: yup.string().required("Year is required"),
        salary: yup.string().required("Salary is required"),
        tax: yup.string().required("Tax is required"),
        incentive_amount: yup.string().required("Incentive Pay is required"),
        deduction_amount: yup.string().required("Deduction Amount is required"),
        deduction_title: yup.string().required("Deduction Title is required"),
        net_pay: yup.string().required("Net Pay is required"),
       
      })
    ),
  })

  useEffect(() => {
    if (selectedSalary) {
      setValue("user_id", selectedSalary?.user_id);
      setValue("month", selectedSalary?.month);
      setValue("year", selectedSalary?.year);
      setValue("salary", selectedSalary?.salary);
      setValue("tax", selectedSalary?.tax);
      setValue("incentive_amount", selectedSalary?.incentive_amount);
      setValue("deduction_amount", selectedSalary?.deduction_amount);
      setValue("deduction_title", selectedSalary?.deduction_title);
      setValue("net_pay", selectedSalary?.net_pay);
     
      

    }
  }, [selectedSalary, setValue]);
  const onsubmit = async (data: any) => {
    if (selectedSalary) {
      await dispatch(updateSalary({ data, id: selectedSalary?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
    else {
      await dispatch(createSalary(data)).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
  };

 
  const handleUserChange = (option: any, actionMeta: any) => {
    console.log(option.value);
    setSelectedUser(option.value)
    setValue("user_id", option.value);
  }

  const handleDelete = async () => {
    await dispatch(deleteSalary(selectedSalary?.id)).then((res: any) => {
      if (res.payload.success) {
        setShowDeleteModal(false);
        reset();
        setSelectedSalary(null);
        
      }
    });
  };
  

  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Salaries"
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
                    <th>Month</th>
                    <th>Year</th>
                    <th>Salary</th>
                    <th>Tax</th>
                    <th>Incentive Amount</th>
                    <th>Deduction Amount</th>
                    <th>Deduction Title</th>
                    <th>Net Pay</th>
                    <th>Payment Date</th>
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {salaryState.salaries.map((salary: any, index) => (
                    <tr key={salary?.id}>
                      <td>{index + 1}</td>
                      <td>{salary?.user?.user_name}</td>
                      <td>{salary?.month}</td>
                      <td>{salary?.year}</td>
                      <td>{salary?.salary}</td>
                      <td>{salary?.tax}</td>
                      <td>{salary?.incentive_amount}</td>
                      <td>{salary?.deduction_amount}</td>
                      <td>{salary?.deduction_title}</td>
                      <td>{salary?.net_pay}</td>
                      <td>{salary?.payment_date}</td>
                      
                      <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedSalary(salary);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedSalary(salary);
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
            {selectedSalary ? "Edit Salary" : "Add Salary"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>
              <SelectInput
                text="User"
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

              <TextFields
                register={register}
                error={errors?.month?.message}
                name="month"
                label="Month"
                type="text"
                placeholder="Enter Month"
              />

              <TextFields
                register={register}
                error={errors?.year?.message}
                name="year"
                label="Year"
                type="text"
                placeholder="Enter Year"
              />

              <TextFields
                register={register}
                error={errors?.salary?.message}
                name="salary"
                label="Salary"
                type="number"
                placeholder="Enter Salary"
              />

              <TextFields
                register={register}
                error={errors?.tax?.message}
                name="tax"
                label="Tax"
                type="number"
                placeholder="Enter Tax"
              />

              <TextFields
                register={register}
                error={errors?.incentive_amount?.message}
                name="incentive_amount"
                label="Incentive Pay"
                type="number"
                placeholder="Enter Incentive Pay"
              />
              <TextFields
                register={register}
                error={errors?.deduction_amount?.message}
                name="deduction_amount"
                label="Deduction Amount"
                type="number"
                placeholder="Enter Deduction Amount"
              />

              <TextFields
                register={register}
                error={errors?.deduction_title?.message}
                name="deduction_title"
                label="Deduction Title"
                type="text"
                placeholder="Enter Deduction Title"
              />

              <TextFields
                register={register}
                error={errors?.net_pay?.message}
                name="net_pay"
                label="Net Pay"
                type="number"
                placeholder="Enter Net Pay"
              />

             

                

              



            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedSalary ? `Update` : `Add`}`} type="submit" className="dashboardlink" />
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
