import React from 'react';
import { Link } from 'react-router-dom'
import architecture from './architecture.png';

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
                    the use of <b>cloud serverless</b> technology. The app allows the user to order
                    coffee online and have it delievered at his home or office. The diagram below
                    shows the application architecture.
                </p>
                <a href={architecture}>
                    <img src={architecture} alt="Cloud architecture" className="img-fluid" />
                </a>
                <p><i>Click on the image to increase the size.</i></p>
                <p>
                    The application is completely built as IaC (infrastructure as code). <a href="https://terraform.io">Terraform</a> is
                    used for managing the infrastructure code, allowing the whole application infrastructure
                    to be completely tear down and reubuilt in less than 3 minutes.
                </p>

                <h3>Frontend</h3>
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
                    Additionally, I'm using <a href="https://redux.js.org/">Redux</a> to store the
                    state of the application in a centralized location, and <a href="https://github.com/ReactTraining/react-router">React router</a> to 
                    improve the navigation inside the application.
                </p>
                <p>
                    The AWS cloud infrastructure for the frontend is completely serverless. The static website
                    is located at a <b><a href="https://aws.amazon.com/s3/">S3 bucket</a></b> located in Northern Virginia region. <b><a href="https://aws.amazon.com/cloudfront/">Cloudfront</a></b> is
                    used to bring the static content closer to the user, spreading the application to over 50
                    edge locations around the world provided by AWS. A <a href="https://aws.amazon.com/certificate-manager/"><b>ACM certificate</b></a> provides security
                    by allowing only HTTPS connections to the application.
                </p>
                <p>
                    The frontend source code, along with its Terraform files, is available at <a href="https://github.com/coffee-io/frontend">https://github.com/coffee-io/frontend</a>.
                    The frontend (including infrastructure) is built automatically everytime a commit happens (see <b>CI/CD</b> section below).
                </p>

                <h3>Backend</h3>
                <p>
                    The backend provides API integration for the application frontend. The AWS cloud infrastructure for the backend is completely serverless.
                </p>
                <p>
                    All application data is stored in the AWS serverless NoSQL database <b><a href="https://aws.amazon.com/dynamodb/">DynamoDB</a></b>.
                    APIs are provided through the <b><a href="https://aws.amazon.com/api-gateway/">AWS API Gateway</a></b>. The
                    API Gateway is a technology that allows API calls to be connected to any AWS service. In the case of Mycoffee,
                    the API connects directly to DynamoDB to extract information from the database.
                </p>
                <p>
                    For writing data that needs verification and processing, the API Gateway is
                    connected to a set of <b><a href="https://aws.amazon.com/lambda/">Lambda functions</a></b>,
                    that allow code to be executed completely serverless on AWS. These lambda functions then connect
                    to DynamoDB for writing data, and to <b><a href="https://aws.amazon.com/ses/">SES</a></b> for
                    sending confirmation e-mail to the users.
                </p>
                <p>
                    In addition to that, AWS <b><a href="https://aws.amazon.com/route53/">Route53</a></b> is
                    used for hosting the DNS domain and redirecting the subdomains.
                </p>
                <p>
                    The backend source code, along with its Terraform files, is available at <a href="https://github.com/coffee-io/frontend">https://github.com/coffee-io/backend</a>.
                    The backend (including infrastructure) is built automatically everytime a commit happens (see <b>CI/CD</b> section below).
                </p>

                <h3>CI/CD</h3>
                <p>
                    This application is build with Continuos Integration and Continuos Delivery
                    in mind.
                </p>
                <p>
                    The application source code is hosted on <a href="https://github.com/coffee-io/">GitHub</a>.
                    Everytime a push event happens on one of the repositories (backend or frontend), a trigger is
                    fired to a <a href="https://jenkins.io/">Jenkins server</a>, which then builds and deploy 
                    the whole application.
                </p>
                <p>Steps involved in building the application are:</p>
                <ul>
                    <li><b>backend</b>: provision the infrastructure on AWS and upload the lambdas;</li>
                    <li><b>frontend</b>: provision the infrastructure, creates a <a href="https://www.docker.com/">Docker</a> container that compiles and test the React application, and then uploads it to S3.</li>
                </ul>
                <p>
                    The Jenkins server used for building Mycoffee is publically available at <a href="http://jenkins.coffee.gamesmith.co.uk/">http://jenkins.coffee.gamesmith.co.uk/</a>.
                </p>
            </main>
        </div>
    );
}

// vim:st=4:sts=4:sw=4:expandtab
