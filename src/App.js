import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccess: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "test file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios.post('https://rhysfnc9ic.execute-api.us-east-1.amazonaws.com/prod-deploy/file-upload', formData).then(() => {
      this.setState({selectedFile: null});
      this.setState({fileUploadedSuccess: true});
    });
  }

  fileDetails = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details</h2>
          <p>FileName: {this.state.selectedFile.name}</p>
          <p>FileType: {this.state.selectedFile.type}</p>
          {/* <p>Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}</p> */}
        </div>
      )
    } else if (this.state.fileUploadedSuccess) {
      return (
        <div>
          <br />
          <h4>File has been uploaded successfully</h4>
        </div>
      )
    } else {
      return (
        <div>
          <h4>Choose a file to upload</h4>
        </div>
      )
    }
  }


  render() {
    return (
      <div className='container'>
        <h2>File Upload App</h2>
        <h3>File upload with React, AWS S3, API gateway, Lambda Function</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload
          </button>
          {this.fileDetails()}
        </div>
      </div>
    )
  }
}

export default App;
