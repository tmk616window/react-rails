import React from 'react'
import Router from 'next/router'
// import DashboardLayout from '../layouts/DashboardLayout'
import useSWR, { mutate } from 'swr'
import api from '../services/Api'
// import PageInfo from '../components/PageInfo'
import  { ProtectRoute, useAuth } from '../src/contexts/auth'
import Skeleton from 'react-loading-skeleton';
import Axios from "axios";

function Dashboard() {

    let urls = {
        test: `http://localhost:3334`,
        development: 'http://localhost:3333/',
        production: 'https://your-production-url.com/'
    }
    const api = Axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const { user, loading }:any = useAuth();
    const { data: { data: pages } = {}, isValidating } = useSWR(loading ? false : '/', api.get)

    const showSkeleton = isValidating || loading

    return (
        <>
            <div>
                    <div className="row">
                        <div className="col-md-12">
                            <h1 test-id="dashboard-title">
                                These are your pages
                            </h1>
                            <br />
                            <table className="table table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Shareable Link</th>
                                        <th scope="col">Created</th>
                                        <th scope="col">Responses</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages && pages.map((page:any) => (
                                            <p>{page}</p>
                                    ))}
                                </tbody>

                            </table>
                            {showSkeleton && <Skeleton height={40} count={5} />}
                        </div>
                    </div>
            </div>
        </>
    )
}




export default ProtectRoute(Dashboard);
