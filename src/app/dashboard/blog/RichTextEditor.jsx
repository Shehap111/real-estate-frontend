'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Eraser,
  List,
  ListOrdered,
  Image as ImageIcon,
} from 'lucide-react';

import {
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import {useEffect} from 'react';

const TiptapEditor = ({ label, value, onChange, isRTL = false }) => {
  const theme = useTheme();

  const promptForURL = (message) => {
    const url = prompt(message);
    return url && url.trim() !== '' ? url : null;
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
    ],
    content: value, // دي بتستخدم مرة واحدة بس عند أول تحميل
    editorProps: {
      attributes: {
        class: 'custom-editor',
        style: `
          min-height: 180px;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 1rem;
          background: ${theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff'};
          color: ${theme.palette.text.primary};
          direction: ${isRTL ? 'rtl' : 'ltr'};
        `,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  
    
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);
      

  const setLink = () => {
    const url = promptForURL('Enter URL');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  const insertImage = () => {
    const url = promptForURL('Enter image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <Box mb={3}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {label}
      </Typography>

      {/* Toolbar */}
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
        >
          <Bold size={18} />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
        >
          <Italic size={18} />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          color={editor.isActive('underline') ? 'primary' : 'default'}
        >
          <UnderlineIcon size={18} />
        </IconButton>

        <IconButton
          size="small"
          onClick={setLink}
          color={editor.isActive('link') ? 'primary' : 'default'}
        >
          <LinkIcon size={18} />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
        >
          <Typography fontSize={14}>H2</Typography>
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
        >
          <List size={18} />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
        >
          <ListOrdered size={18} />
        </IconButton>

        <IconButton size="small" onClick={insertImage}>
          <ImageIcon size={18} />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        >
          <Eraser size={18} />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 1 }} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </Box>
  );
};

export default TiptapEditor;
