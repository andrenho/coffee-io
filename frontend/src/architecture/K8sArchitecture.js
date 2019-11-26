import React from 'react';
import { Link } from 'react-router-dom'
import architecture from './k8s.png';

export default function Architecture(props) {
    return (
        <div className="container-fluid">
            <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
                <p className="lead">
                    Contact me at <a href="andre.nho@gmail.com">andre.nho@gmail.com</a>.
                </p>
                <h3>Application architecture</h3>
                <p>
                    <b>Mycoffee</b> is an application I built with the goal of learning and showcasing
                    the use of a number of <b>cloud technologies</b>. The app allows the user to order
                    coffee online and have it delievered at his home or office. The diagram below
                    shows the application architecture for thie <b>Kubernetes</b> backend.
                </p>
                <a href={architecture}>
                    <img src={architecture} alt="Cloud architecture" className="img-fluid" />
                </a>
                <p><i>Click on the image to increase the size.</i></p>
                <p>
                    The application is built using IaC (infrastructure as code). <a href="https://terraform.io">Terraform</a> is
                    used for managing the infrastructure code, allowing the whole application infrastructure
                    to be completely tear down and reubuilt in less than 3 minutes.
                </p>

                <h3>Frontend application</h3>
                <p>
                    <b>Mycoffee</b> is a SPA (single-page application). SPAs are applications that
                    load a single HTML page and dynamically updates its contents, effectively using
                    the user's browser as the execution platform, and communicating to the backend
                    only through the use of APIs. This reduces the load on the backend server, and
                    provides a better and more resposive experience to the user.
                </p>
                <p>
                    The frontend application is written in <a href="http://es6-features.org/">ES6 Javascript</a>,
                    using <a href="https://reactjs.org/">React</a> as its main library. React allows
                    the construction of reusable components. Example of a reusable component in <b>Mycoffee</b> is
                    the shopping cart, that is used to show both the <Link to="/cart">user shopping cart</Link> and&nbsp;
                    <Link to="/admin">past purchases</Link>.
                </p>
                <p>
                    Additionally, <a href="https://redux.js.org/">Redux</a> is being used to store the
                    state of the application in a centralized location, and <a href="https://github.com/ReactTraining/react-router">React router</a> to 
                    improve the navigation inside the application.
                </p>
                <p>
                    The frontend is served by a <a href="https://www.nginx.com/">nginx</a> container on the Kubernetes
                    cluster. While there are better ways to serve static content, this specific environment was built
                    this because the main goal was for me to learn Kubernetes. The Kubernetes container is hosted
                    on <a href="https://cloud.google.com/">Google Cloud</a>.
                </p>

                <h3>Backend and infrastructure</h3>
                <p>
                    The backend provides API integration for the application frontend. Both the backend and frontend
                    are managed by a <a href="https://kubernetes.io/">Kubernetes</a> cluster hosted 
                    on <a href="https://cloud.google.com/">Google Cloud</a>.
                </p>
                <p>
                    The cluster contains an auto-scalable node pool, which means that nodes are created and destroyed
                    according to the website traffic. In normal days, the cluster is able to operate the frontend,
                    backend and database from a single node using 1 vCPU and 1.7 GB of RAM, which is pretty good.
                </p>
                <p>
                    The main <a href="https://kubernetes.io/docs/concepts/workloads/pods/pod/">pods</a> on the cluster are:
                    <ul>
                        <li>
                            <b>frontend</b>: a nginx container serving static content (the React application).
                            The pod is horizontally auto-scaled (that is, new pods will be instanciated is the CPU 
                            or RAM usage is too high). The HTTP port of this service is publically availabe through
                            a service.
                        </li>
                        <li>
                            <b>backend</b>: a backend application written in <a href="https://golang.org/">go</a>,
                            which connects to the database to execute the requests.  The pod is horizontally auto-scaled.
                            The HTTP port of this service is publically availabe through a service.
                        </li>
                        <li>
                            <b>database</b>: a <a href="https://www.mysql.com/">MySQL</a> database running in a container.
                            This pos is completely shut off from the outside world, being accessible only from the other
                            pods. It uses a <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">pv</a>
                            &nbsp;(Kubernetes persistent volume) pointing to a 
                            &nbsp;<a href="https://cloud.google.com/persistent-disk/">Google Cloud persistent disk</a>, in order
                            not to lose data even if the pod is lost or restarted.
                        </li>
                        <li>
                            <b>db-cleaner</b>: a <a href="https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/">CronJob</a>,
                            written in go, that runs at midnight and removes all orders, keeping the demonstration clean.
                        </li>
                    </ul>
                </p>
                <p>
                    In addition to that, <a href="https://developers.google.com/speed/public-dns">Google DNS</a> is
                    used for hosting the DNS domain and redirecting the subdomains.
                </p>

                <h3>Source code</h3>
                <p>
                    The full source code, along with its Terraform and setup files, is available at 
                    &nbsp;<a href="https://github.com/andrenho/coffee-io">https://github.com/andrenho/coffee-io</a>.
                </p>

            </main>
        </div>
    );
}

// vim:st=4:sts=4:sw=4:expandtab
