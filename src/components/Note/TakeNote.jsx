import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

export default function TakeNote({ activeNote, onEditField }) {
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
                id="body"
                rows={5}
                placeholder="Write your note here..."
                value={activeNote?.body || ''}
                onChange={(e) => onEditField('body', e.target.value)}
                className="block max-[550px]:max-h-[550px] min-[550px]:max-h-[300px] min-[560px]:max-h-[550px] w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
              />
            </div>
          </TabPanel>
          <TabPanel className="main-note-preview -m-0.5 rounded-lg p-0.5">
            <div className="border-b">
              <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm text-gray-800">
                <h1 className="preview-title">{activeNote?.title || 'Untitled'}</h1>
                <div className="markdown-preview">{activeNote?.body}</div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </form>
  )
}
