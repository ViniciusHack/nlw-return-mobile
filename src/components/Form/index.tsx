import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FeedbackType } from '../../components/Widget';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenShotButton } from '../ScreenShotButton';
import { styles } from './styles';



interface Props {
  feedbackType: FeedbackType;
}

export function Form({ feedbackType }: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
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

      {/* <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      /> */}
      <View style={styles.footer}>
        <ScreenShotButton 
          onTakeShot={() => {}}
          onRemoveShot={() => {}}
          screenshot='https://github.com/rodrigorgtic.png' //https://github.com/rodrigotrgtic
       />
       <Button isLoading={false}/>
      </View>
    </View>
  );
}