import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useRef } from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function TakeNote({ activeNote, onEditField }) {
  const textareaRef = useRef(null)

  const handleChange = (e) => {
    onEditField('body', e.target.value) // Chỉ cập nhật nội dung mà không đụng đến con trỏ
  }

  return (
    <form action="#">
      <TabGroup>
        <TabList className="group flex items-center">
          <Tab className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[selected]:bg-light-secondary-20 data-[selected]:text-gray-900 data-[selected]:hover:bg-light-secondary-20">
            Write
          </Tab>
          <Tab className="ml-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[selected]:bg-light-secondary-20 data-[selected]:text-gray-900 data-[selected]:hover:bg-light-secondary-20">
            Preview
          </Tab>
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="main-note-edit -m-0.5 rounded-lg p-0.5">
            <div>
              <textarea
                ref={textareaRef}
                id="body"
                rows={5}
                placeholder="Write your note here..."
                value={activeNote?.body || ''}
                onChange={handleChange}
                className="min-[360px]:max-h-[550px] max-[550px]:max-h-[300px] min-[555px]:max-h-[580px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-secondary overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
              />
            </div>
          </TabPanel>
          <TabPanel className="main-note-preview -m-0.5 rounded-lg p-0.5">
            <div className="border-b">
              <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm text-gray-800">
                <ReactMarkDown className="markdown-preview" remarkPlugins={[remarkGfm]}>
                  {activeNote?.body}
                </ReactMarkDown>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </form>
  )
}
