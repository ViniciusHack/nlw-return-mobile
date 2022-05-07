import * as FileSystem from 'expo-file-system';
import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { FeedbackType } from '../../components/Widget';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { api } from '../libs/api';
import { ScreenShotButton } from '../ScreenShotButton';
import { styles } from './styles';


interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    }).then(uri => setScreenshot(uri))
    .catch(error => console.log(error))
  }

  function handleScreenshotRemove() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if(isSendingFeedback) {
      return
    }
    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'});

    
    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot:`data:image/png;base64, ${screenshotBase64}`,
        comment,
      });
      
      onFeedbackSent();
    }catch (err) {
      console.log(err);
      setIsSendingFeedback(false);
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft 
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Image 
              source={feedbackTypeInfo.image}
              style={styles.image}
            />
            <Text style={styles.titleText}>
              {feedbackTypeInfo.title}
            </Text>
          </View>
      </View>

      <TextInput 
        multiline
        autoCorrect={false}
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenShotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
       />
       <Button 
        onPress={handleSendFeedback}
        isLoading={isSendingFeedback}
       />
      </View>
    </View>
  );
}