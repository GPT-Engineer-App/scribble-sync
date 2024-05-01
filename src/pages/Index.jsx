import { useState } from 'react';
import { Box, Button, Flex, Input, Textarea, useToast, SimpleGrid } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="md">
    <Input value={note.title} onChange={(e) => onEdit(note.id, e.target.value, note.content)} variant="unstyled" fontSize="xl" fontWeight="bold" />
    <Textarea value={note.content} onChange={(e) => onEdit(note.id, note.title, e.target.value)} variant="unstyled" mt={2} />
    <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => onDelete(note.id)} mt={2}>
      Delete
    </Button>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (!newTitle || !newContent) {
      toast({
        title: 'Error',
        description: "Title and content can't be empty",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
    };
    setNotes([...notes, newNote]);
    setNewTitle('');
    setNewContent('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, title, content) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, title, content };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <Flex direction="column" p={5}>
      <Box mb={4}>
        <Input placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <Textarea placeholder="Content" value={newContent} onChange={(e) => setNewContent(e.target.value)} mt={2} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote} mt={2}>
          Add Note
        </Button>
      </Box>
      <SimpleGrid columns={3} spacing={4}>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Index;