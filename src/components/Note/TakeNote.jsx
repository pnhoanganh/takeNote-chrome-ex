import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState, useEffect } from 'react'
import TipTap from './Tiptap/TipTap'
import './Tiptap/styles.css'

export default function TakeNote({ activeNote, onEditField }) {
  const [description, setDescription] = useState(activeNote?.body || '')

  useEffect(() => {
    setDescription(activeNote?.body || '')
  }, [activeNote])

  return (
    <form action="#">
      <TabGroup>
        <TabList className="group flex items-center">
          <Tab className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[selected]:bg-light-secondary-20 data-[selected]:text-gray-900">
            Write
          </Tab>
          {/* <Tab
            onClick={() => setDescription(activeNote?.body || '')}
            className="ml-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[selected]:bg-light-secondary-20 data-[selected]:text-gray-900"
          >
            Preview
          </Tab> */}
        </TabList>
        <TabPanels className="mt-2">
          {/* Tab Write */}
          <TabPanel className="main-note-edit -m-0.5 rounded-lg p-0.5">
            <TipTap
              key={activeNote?.id}
              activeNote={activeNote}
              onEditField={(field, value) => {
                onEditField(field, value)
                setDescription(value)
              }}
            />
          </TabPanel>
          {/* Tab Preview */}
          {/* <TabPanel className="main-note-preview -m-0.5 rounded-lg p-0.5">
            <div className="border-b">
              <div className="ProseMirror mx-px mt-px px-3 pb-12 pt-2 text-sm text-gray-800">
                {parser(description)}
                {console.log(description)}
              </div>
            </div>
          </TabPanel> */}
        </TabPanels>
      </TabGroup>
    </form>
  )
}
