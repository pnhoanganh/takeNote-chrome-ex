import { React, useState } from 'react'
import Modal from '../../Modal/Modal'
import Export from './Export'
import Import from './Import'
import { CiExport, CiImport } from 'react-icons/ci'
import { MdOutlineImportExport } from 'react-icons/md'

export default function ImportExportModal({ isImportExportOpen, handleCloseImportExport }) {
  const [selectionTab, setSelectionTab] = useState('import')
  return (
    <>
      {/* Modal for Export and Import */}
      <Modal open={isImportExportOpen} onClose={handleCloseImportExport}>
        <div className="mt-2 max-[450px]:min-w-[250px] max-[450px]:min-h-[300px] max-[560px]:min-w-[400px] max-[560px]:min-h-[350px] min-[565px]:min-w-[500px] min-[565px]:min-h-[500px] overflow-hidden">
          <h3 className="text-xl text-center text-secondary font-semibold mb-4 flex justify-center items-center gap-2">
            <MdOutlineImportExport size="30px" />
            {selectionTab === 'import' ? 'Import Your Notes' : 'Export Your Notes'}
          </h3>
          <hr />
          <div className="flex justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {/* Tabs */}
            <div className="flex justify-center mt-4 gap-1">
              <button
                className={`flex flex-row justify-center items-center gap-2 rounded-full px-[30px] py-[5px] text-sm font-semibold ${selectionTab === 'import' ? ' bg-light-secondary-20 text-gray-900' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setSelectionTab('import')}
              >
                <CiImport size="14" />
                Import
              </button>
              <button
                className={`flex flex-row justify-center items-center gap-2 rounded-full px-[30px] py-[5px] text-sm font-semibold ${selectionTab === 'export' ? 'bg-light-secondary-20 text-gray-900' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setSelectionTab('export')}
              >
                <CiExport size="14" />
                Export
              </button>
            </div>
          </div>
          <div className="p-4 mt-6 border border-gray-300 rounded-md h-[150px] min-[560px]:max-h-[220px]">
            {selectionTab === 'import' ? <Import /> : <Export />}
          </div>
        </div>
      </Modal>
    </>
  )
}
