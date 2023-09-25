import React, { useEffect } from 'react'
import Layout from '../../../shared/dashboard/Layout'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import axiosInstance from '../../../../config/axiosInstance'

export const AdminHome = () => {
  const [batch, setBatches] = useState<any>(null)
  const [batchstudents, setBatchStudents] = useState<any>(null);

  const [course, setCourse] = useState<any>(null)
  const [coursestudents, setCourseStudents] = useState<any>(null);

  const [role, setRoles] = useState<any>(null)
  const [users, setUsers] = useState<any>(null);

  const [book, setBooks] = useState<any>(null)
  const [bookcourses, setBookCourses] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get('http://localhost:8000/api/batch-students').then((res) => {
      console.log(res.data);
      setBatches({
        chart: {
          height: 350,
          zoom: {
            enabled: false
          },

          id: "batchstudents"
        },
        datalabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        xaxis: {
          categories: res.data.map((item: any) => item.batch)
        },
        title: {
          text: "Number of Students in each batch",
          align: "left"
        },
      })
      setBatchStudents([{

        name: 'Students',
        data: res.data.map((item: any) => item.students)

      }]);
    });
  }, [])



  useEffect(() => {
    axiosInstance.get('http://localhost:8000/api/course-students').then((res) => {
      console.log(res.data);
      setCourse({
        chart: {
          type: "bar",
          height: 350,
          zoom: {
            enabled: false
          },

          id: "coursestudents"
        },
        datalabels: {
          enabled: false
        },
        bar: {
          horizontal: true,
          borderRadius: 2
        },
        xaxis: {
          categories: res.data.map((item: any) => item.course)
        },
        title: {
          text: "Current Year Students In Each Course",
          align: "left"
        },
      })
      setCourseStudents([{

        name: 'Students',
        data: res.data.map((item: any) => item.students)

      }]);
    });
  }, [])

  /* useEffect(() => {
    axiosInstance.get('http://localhost:8000/api/course-students-last-five-years').then((res) => {
      console.log(res.data);
      setYear({
        chart: {
          height: 350,
          zoom: {
            enabled: false
          },
  
          id: "yearstudents"
        },
        datalabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        xaxis: {
          categories: res.data.map((item: any) => item.year)
        },
        title: {
          text: "Number of Students in each year",
          align: "left"
        },
      })
      setYearStudents([{
          
          name: 'Students',
          data: res.data.map((item: any) => item.students)
    
        }]);
    });
  }, []) */

  //make a pie chart for roles and users
  useEffect(() => {
    axiosInstance.get('http://localhost:8000/api/roles-users').then((res) => {
      console.log(res.data);
      setUsers(
        res.data.map((item: any) => item.users)

      );
      setRoles({
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: res.data.map((item: any) => item.role),
        title: {
          text: "Number of Users in each role",
          align: "left"
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]


      })
    });
  }, [])







  //Number of books in each course
  useEffect(() => {
    axiosInstance.get('http://localhost:8000/api/book-courses').then((res) => {
      console.log(res.data);
      setBooks({
        chart: {
          type: "bar",
          height: 350,
          zoom: {
            enabled: false
          },

          id: "bookcourses"
        },
        datalabels: {
          enabled: false
        },
        bar: {
          horizontal: true,
          borderRadius: 2
        },
        xaxis: {
          categories: res.data.map((item: any) => item.course)
        },
        title: {
          text: "Number Of Books In Each Course",
          align: "left"
        },
      })
      setBookCourses([{

        name: 'Courses',
        data: res.data.map((item: any) => item.books)

      }]);
    });
  }, [])

  const [counts, setCounts] = useState<any>(null);
  useEffect(() => {
    axiosInstance.get('http://localhost:8000/api/count').then((res) => {
      setCounts(res.data);
    });
  }, [])


  return (
    <Layout>

      <div>
        <h1 className="text-3xl text-gray-500">Welcome to  Dashboard</h1>
        <div className="flex w-full flex-wrap gap-4 my-8">
          <div className="w-3/12 rounded overflow-hidden shadow-lg ">
            <div className="px-4 py-2 flex">
              <span class="items-center px-5 py-5 text-white bg-[#008FFB] rounded-md">A</span>
              <div class="mx-4 mt-4 ">
                <div class="antialiased font-bold text-gray-600 md:text-sm"> Students</div>
                <div class="text-sm text-gray-600">{counts?.students}</div>
              </div>
            </div>
          </div>

          <div className="w-3/12 rounded overflow-hidden shadow-lg ">
            <div className="px-4 py-2 flex">
              <span class="items-center px-5 py-5 text-white bg-[#008FFB] rounded-md">
                A</span>
              <div class="mx-4 mt-4 ">
                <div class="antialiased font-bold text-gray-600 md:text-sm"> Teachers</div>
                <div class="text-sm text-gray-600">{counts?.teachers}</div>
              </div>
            </div>

          </div>



          <div className="w-3/12 rounded overflow-hidden shadow-lg ">
            <div className="px-4 py-2 flex">
              <span class="items-center px-5 py-5 text-white bg-[#008FFB] rounded-md">
                A</span>
              <div class="mx-4 mt-4 ">
                <div class="antialiased font-bold text-gray-600 md:text-sm"> Courses</div>
                <div class="text-sm text-gray-600">{counts?.courses}</div>
              </div>
            </div>
          </div>

          <div className="w-3/12 rounded overflow-hidden shadow-lg ">
            <div className="px-4 py-2 flex">
              <span class="items-center px-5 py-5 text-white bg-[#008FFB] rounded-md">
                A</span>
              <div class="mx-4 mt-4 ">
                <div class="antialiased font-bold text-gray-600 md:text-sm"> Books</div>
                <div class="text-sm text-gray-600">{counts?.books}</div>
              </div>
            </div>
          </div>

          <div className="w-3/12 rounded overflow-hidden shadow-lg ">
            <div className="px-4 py-2 flex">
              <span class="items-center px-5 py-5 text-white bg-[#008FFB] rounded-md">
                A</span>
              <div class="mx-4 mt-4 ">
                <div class="antialiased font-bold text-gray-600 md:text-sm"> Subjects</div>
                <div class="text-sm text-gray-600">{counts?.subjects}</div>
              </div>
            </div>
          </div>

          <div className="w-3/12 rounded overflow-hidden shadow-lg ">
            <div className="px-4 py-2 flex">
              <span class="items-center px-5 py-5 text-white bg-[#008FFB] rounded-md">
                A</span>
              <div class="mx-4 mt-4 ">
                <div class="antialiased font-bold text-gray-600 md:text-sm"> Departments</div>
                <div class="text-sm text-gray-600">{counts?.departments}</div>
              </div>
            </div>
          </div>


          
        </div>
      </div>

















      <div className="flex flex-wrap justify-between gap-4">
        <div className="text-xl text-gray-500 shadow-md">
          {batch && batchstudents && (
            <Chart options={batch} series={batchstudents} type="area" width={500} height={320} />
          )}
        </div>

        <div className="text-xl text-gray-500 shadow-md">
          {course && coursestudents && (
            <Chart options={course} series={coursestudents} type="bar" width={500} height={320} />
          )}
        </div>

        <div className="text-xl text-gray-500 shadow-md">
          {role && users && (
            <Chart options={role} series={users} type="pie" width={500} height={320} />
          )}
        </div>
        <div className="text-xl text-gray-500 shadow-md">
          {book && bookcourses && (
            <Chart options={book} series={bookcourses} type="bar" width={500} height={320} />
          )}
        </div>



        {/* <div className="text-xl text-gray-500 shadow-md">
          {year && yearstudents && (
            <Chart options={year} series={yearstudents} type="bar" width={500} height={320} />
          )}
        </div> */}
      </div>
    </Layout>
  )

}