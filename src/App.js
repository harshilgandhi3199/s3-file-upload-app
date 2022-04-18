import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    textInput: '',
    selectedFile: null,
    fileUploadedSuccess: false
  }

  onTextChange = (event) => {
    this.setState({ textInput: event.target.value });
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  }

  onFileUpload = () => {
    var formData = new FormData();
    formData.append('fileName', this.state.selectedFile, this.state.selectedFile.name);
    formData.append('inputText', this.state.textInput);
    axios.post('https://6dor1bxbgd.execute-api.us-east-1.amazonaws.com/production/file-upload', formData).then(() => {
      this.setState({ selectedFile: null });
      this.setState({ fileUploadedSuccess: true });
      this.setState({ textInput: '' });
    });
  }

  fileDetails = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details</h2>
          <p>FileName: {this.state.selectedFile.name}</p>
          <p>FileType: {this.state.selectedFile.type}</p>
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
        <h2>File Upload Project</h2>
        <div>
          <div>
            Text Input: <input type="text" onChange={this.onTextChange} value={this.state.textInput} />
            <br />
          </div>
          <br />
          <div>
            File Input: <input type="file" onChange={this.onFileChange} />
          </div>
          <br />
          <button onClick={this.onFileUpload}>
              Submit
          </button>
          {this.fileDetails()}
        </div>
      </div>
    )
  }
}

export default App;
