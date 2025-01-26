import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

export default function TakeNote() {
  return (
    <form action="#">
      <TabGroup>
        <TabList className="group flex items-center">
          <Tab className="rounded-md  bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[selected]:bg-light-secondary-20 data-[selected]:text-gray-900 data-[selected]:hover:bg-light-secondary-20">
            Write
          </Tab>
          <Tab className="ml-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[selected]:bg-light-secondary-20 data-[selected]:text-gray-900 data-[selected]:hover:bg-light-secondary-20">
            Preview
          </Tab>
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="-m-0.5 rounded-lg p-0.5">
            <div>
              <textarea
                id="comment"
                name="comment"
                rows={5}
                placeholder="Add your note..."
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6"
                defaultValue={''}
              />
            </div>
          </TabPanel>
          <TabPanel className="-m-0.5 rounded-lg p-0.5">
            <div className="border-b">
              <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm text-gray-800">
                Preview content will render here.
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      {/* <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Post
        </button>
      </div> */}
    </form>
  )
}
