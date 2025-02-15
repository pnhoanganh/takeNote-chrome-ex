import './styles.css'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import HardBreak from '@tiptap/extension-hard-break'
import Gapcursor from '@tiptap/extension-gapcursor'
import Placeholder from '@tiptap/extension-placeholder'
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
} from 'react-icons/fa'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const handleClick = (command, options = {}) => {
    if (editor.can().chain().focus()[command](options).run()) {
      editor.chain().focus()[command](options).run()
    }
  }

  return (
    <div className="control-group">
      <div>
        <button
          onClick={() => handleClick('toggleBold')}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => handleClick('toggleItalic')}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => handleClick('toggleUnderline')}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => handleClick('toggleStrike')}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => handleClick('toggleCode')}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <FaCode />
        </button>
        <button
          onClick={() => handleClick('toggleHeading', { level: 1 })}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <FaHeading />
        </button>
        <button
          onClick={() => handleClick('toggleBulletList')}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => handleClick('toggleOrderedList')}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => handleClick('toggleCodeBlock')}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <RiCodeBlock />
        </button>
        <button
          onClick={() => handleClick('toggleBlockquote')}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => handleClick('undo')}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => handleClick('redo')}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  )
}

const extensions = [
  StarterKit.configure({
    hardBreak: false,
  }),
  Underline,
  BulletList,
  OrderedList,
  ListItem,
  Gapcursor,
  HardBreak.extend({ keepMarks: true, keepAttributes: true }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Placeholder.configure({ placeholder: 'Write something...' }),
]

const TipTap = ({ activeNote, onEditField }) => {
  const editor = useEditor({
    extensions,
    content: activeNote?.body || '',
    onUpdate: ({ editor }) => {
      let html = editor.getHTML()
      html = html.replace(/ /g, '\u00a0')
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
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap
