import Buttons from "../buttons/Buttons"
import Layout from "../dashboard/Layout"
import { TableLayout, Table, THead, TBody, TableActions } from "../table/Table"

const DataDisplay = () => {
    return (
        <>
            <Layout>
                <div className="w-full">
                    <TableLayout heading="Users" rightheading={<Buttons text="Add New" type="button" />}>
                        <div >
                            <Table >
                                <THead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Date_of_birth</th>
                                        <th>Actions</th>
                                    </tr>
                                </THead>
                                <TBody>
                                    <tr>
                                        <td>1</td>
                                        <td>Krishna</td>
                                        <td>krishna@gmail.com</td>
                                        <td>India</td>
                                        <td>98198102981</td>
                                        <td>2000/02/20</td>
                                        <TableActions></TableActions>
                                    </tr>
                                </TBody>
                            </Table>
                        </div>
                    </TableLayout>
                </div>
            </Layout>
        </>
    )
}

export default DataDisplay