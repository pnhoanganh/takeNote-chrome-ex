import './styles.css'
import FlyoutMenus from '../../Menu/FlyoutMenus'
import { useEffect } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { Plugin } from 'prosemirror-state'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import HardBreak from '@tiptap/extension-hard-break'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { RiCodeBlock } from 'react-icons/ri'
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaUndo,
  FaCode,
  FaUnderline,
  FaList,
} from 'react-icons/fa'
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaHighlighter,
} from 'react-icons/fa6'
import { PiHighlighterFill } from 'react-icons/pi'

const listMenu = {
  titleMenu: FaList,
  list: [
    {
      icon: FaListUl,
      name: 'Bullet List',
      action: 'toggleBulletList',
    },
    {
      icon: FaListOl,
      name: 'Ordered List',
      action: 'toggleOrderedList',
    },
  ],
}

const alignMenu = {
  titleMenu: FaAlignCenter,
  list: [
    {
      icon: FaAlignLeft,
      name: 'Left Align',
      action: 'left',
    },
    {
      icon: FaAlignCenter,
      name: 'Center Align',
      action: 'center',
    },
    {
      icon: FaAlignRight,
      name: 'Right Align',
      action: 'right',
    },
    {
      icon: FaAlignJustify,
      name: 'Justify Align',
      action: 'justify',
    },
  ],
}

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="control-group">
      <div className=" flex">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <FaUnderline />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FaStrikethrough />
        </button>
        {/* FaCode */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <FaCode />
        </button>
        {/* FaHeading */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <FaHeading />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <RiCodeBlock />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <FaQuoteLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
        >
          <PiHighlighterFill />
        </button>
        <FlyoutMenus menuData={listMenu} editor={editor} />
        <FlyoutMenus menuData={alignMenu} editor={editor} />
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  )
}
const SplitTextExtension = Extension.create({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown(view, event) {
            const { state, dispatch } = view
            const { selection, schema, tr } = state
            const $pos = selection.$from

            // Ensure Space key works normally
            if (event.key === ' ') {
              return false
            }

            // Handle Enter: Create a new paragraph
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              const transaction = tr.split($pos.pos, 1, [{ type: schema.nodes.paragraph }])
              dispatch(transaction)
              return true
            }

            // Handle Shift+Enter: Insert a HardBreak (line break)
            if (event.key === 'Enter' && event.shiftKey) {
              event.preventDefault()
              const hardBreak = schema.nodes.hard_break.create()
              dispatch(tr.insert(selection.to, hardBreak))
              return true
            }

            return false
          },
        },
      }),
    ]
  },
})

const extensions = [
  StarterKit.configure({ hardBreak: false }),
  Underline,
  HardBreak.extend({ keepMarks: false, keepAttributes: true }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Placeholder.configure({ placeholder: 'Write something...' }),
  SplitTextExtension,
  Document,
  Paragraph,
  Text,
  Heading,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight.configure({ multicolor: false }),
]

const TipTap = ({ activeNote, onEditField }) => {
  const editor = useEditor({
    extensions,
    content: activeNote?.body || '',
    onUpdate: ({ editor }) => {
      let html = editor.getHTML()
      onEditField('body', html)
    },
  })

  useEffect(() => {
    if (editor && activeNote) {
      if (editor?.isEmpty) editor.commands.setContent(activeNote.body || '')
    }
  }, [activeNote, editor])

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu bg-white border rounded-md">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <FaUnderline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              <FaCode />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive('highlight') ? 'is-active' : ''}
            >
              <PiHighlighterFill />
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap
