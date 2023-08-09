import React, { Component } from "react";

class DocumentationView extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container mt-3" style={{minHeight:'80vh'}}>
          <div className="row">
            <div className="col-3">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active"
                  id="v-pills-Introduction-tab"
                  data-toggle="pill"
                  href="#v-pills-Introduction"
                  role="tab"
                  aria-controls="v-pills-Introduction"
                  aria-selected="true"
                >
                  Introduction
                </a>
                <a
                  className="nav-link"
                  id="v-pills-sr-tab"
                  data-toggle="pill"
                  href="#v-pills-sr"
                  role="tab"
                  aria-controls="v-pills-sr"
                  aria-selected="false"
                >
                  System Requirements
                </a>
                <a
                  className="nav-link"
                  id="v-pills-install-tab"
                  data-toggle="pill"
                  href="#v-pills-install"
                  role="tab"
                  aria-controls="v-pills-install"
                  aria-selected="false"
                >
                  Installation
                </a>
                <a
                  className="nav-link"
                  id="v-pills-screenshots-tab"
                  data-toggle="pill"
                  href="#v-pills-screenshots"
                  role="tab"
                  aria-controls="v-pills-screenshots"
                  aria-selected="false"
                >
                  Screenshots
                </a>
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-Introduction"
                  role="tabpanel"
                  aria-labelledby="v-pills-Introduction-tab"
                >
                  <h4>Introduction</h4>
                  <hr />
                  쇼핑몰 사이트를 소개합니다.
                  <span style={{fontSize:"30px"}}> hahah</span>
                  ㅋㅋ
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-sr"
                  role="tabpanel"
                  aria-labelledby="v-pills-sr-tab"
                >
                  <h4>System Requirements</h4>
                  <hr />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-install"
                  role="tabpanel"
                  aria-labelledby="v-pills-install-tab"
                >
                  <h4>Installation</h4>
                  <hr />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-screenshots"
                  role="tabpanel"
                  aria-labelledby="v-pills-screenshots-tab"
                >
                  <h4>Screenshots</h4>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DocumentationView;
