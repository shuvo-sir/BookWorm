import { View, Text } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';

const Create = () => {

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {}

  const handleSubmit = async () => {}

  return (
    <View>
      <Text>Create Tab</Text>
    </View>
  )
}

export default Create