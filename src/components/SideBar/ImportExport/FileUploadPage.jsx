import { React, useState } from 'react'

export default function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)

  const changeHandler = (e) => {
    setSelectedFile(e.target.file[0])
    setIsFilePicked(true)
  }

  const handleSubmission = () => {}
  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  )
}
