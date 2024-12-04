[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/pKaCH46a)

# Nintendo Amiibo Collection
 
-----------

## What is this app about?

This app that I've made in React Native is about showing your favourite amiibo character's in a variety of series that a popular game company in Japan, Nintendo, has released. Now, you maybe asking what is an amiibo? Well, let me tell you. Amiibo's are a small figurines character's from different series that Nintendo has launched over the past years ranging from Animal Crossing to Super Mario Bros. to Metriod series. These figurines character's can be played in some games such as Super Samsh Bros., Mario Kart Deluxe 8 and more. Anyways, enough about the amiibo history/lore, this is about the app that I've created for it and heres are some features that I've implement into my app.

<img src="https://github.com/user-attachments/assets/2976fd33-367d-45bc-a2d3-6cb142f05455" alt="Text Box (Add amiibo)" width="400" height="100"> 

When a user want to add an amiibo into the list of the home page, they'll need to enter in the details of a character in mind into the textboxes shown here. There are 6 textboxes that they need to key in the details about the amiibo, you can watch a demo on how to do it below my screenshots. 

How did I create this textbox in the app? Here's the codes: 
```ruby

<Text style={styles.textHeaderStyle}>Head ID:</Text>
<TextInput
   style={styles.inputStyle}
   placeholder={'E.g. 00000000'}
   onChangeText={(text) => setImgHeadID(text)}
/>
```

The ```<TextInput>``` tag is how I implement the textbox with some styles that is name as 'inputStyle'. 'onChangeText' is a function when the text input text has any changes to which it'll pass it through a string argument back to the callback handler 'setImgHeadId'. This code is also in the edit page but with different fucntions in the ```<TextInput>``` tag (E.g. ```placeholder={'E.g. 00000000'}``` is change to ```value={imgHeadID}``` to get information from the Data.js file}
#

<img src="https://github.com/user-attachments/assets/522c762a-6421-408c-8e81-cafe25d4a733" alt="Series Dropdown menu (Add page)" width="400" height="100"> 

```ruby
<Text style={styles.textHeaderStyle}>Series:</Text>
   <View style={styles.pickerStyle}>
      <RSPickerSelect
        itemKey={series}
        placeholder={{label: 'Please select series category...', value: null}}
        onValueChange={(value) => setSeries(value)}
        items={[
            {label: 'Super Smash Bros.', value: 'Super Smash Bros.', key: 'Super Smash Bros.'},
            {label: 'Super Mario', value: 'Super Mario', key: 'Super Mario'},
            {label: 'Legend of Zelda: BOTW', value: 'Legend of Zelda: BOTW', key: 'Legend of Zelda: BOTW'},
        ]}
      />
   </View>
```
This is how I implement the dropdown menu from importing ```RSPickerSelect from 'react-native-picker-select';``` installing by usinf the command ```npm install @react-native-picker/picker``` and ```npm install react-native-picker-select``` into my project for the user to pick a series of the amiibo character. There's is only 3 series of in the 'items' as the data in the Data.js file hes 3 series of the amiibo. I may add more series into the dropdown but I also need to add more data into my Data.js file so that if the user add, edit or delete any character on the list, tha app knows where to look for when user does the three actions I've mention.
#

<img src="https://github.com/user-attachments/assets/8e1b02b5-384a-459d-b271-0a43e80d91b2" alt="Custom Alert (amiibo added)" width="265" height="572"> 

After user have done entering all informatio into the textboxes and tapping on the submit button, it'll prompt a custom alert box it inform the user that the character has been added to the list including if information page of every amiibo's if the user tap on the character on the list. I was happy when this custom alert was working as I didin't want to use the generic Andriod alert as it looks out of place and plain looking while using it on the physical device.

Here's how I did it:
```ruby
<Modal
   animationType={'slide'}
   transparent={true}
   visible={alertAddedVisible}
   onRequestClose={() => {
      setAlertAddedVisible(false);
   }}
 >
       <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
             <Image
                source={require('./assets/img/amiibo-logo2.png')}
                style={{width: 150, height: 150, objectFit: 'contain'}}
             />
             <Text style={styles.alertMsg}>
             <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 25}}>amiibo</Text> added </Text>
             <View style={styles.alertBtnContainer}>
                <TouchableOpacity
                   style={styles.alertBtn}
                   onPress={() => {
                     let item = {
                       imgHeadId: imgHeadID,
                       imgTailId: imgTailID,
                       character: character,
                       series: series,
                       releaseDate: releaseDate,
                       presentBy: presentBy,
                       desc: description
                     };

                    let indexnum = 2;
                    if (series === 'Super Smash Bros.') {
                      indexnum = 0;
                    } else if (series === 'Super Mario') {
                      indexnum = 1;
                    }

                    amiiboData[indexnum].data.push(item);
                    navigation.navigate('Home');
                    setAlertAddedVisible(false);
                  }}
                 >
                   <Text style={styles.alertTextBtn}>OK</Text>
                 </TouchableOpacity>
               </View>
           </View>
       </View>
 </Modal>

 <TouchableOpacity style={styles.btnStyle} onPress={() => {setAlertAddedVisible(true);}}>
   <View>
      <Text style={{fontSize: 20, fontFamily: 'YaHei-Bold'}}> Submit </Text>
   </View>
 </TouchableOpacity>
```

I imported and used ```<Modal>``` tag to create this alert box. ```<Modal>``` is a basic component display contents above any enclosing view where it aids in creating pop-ups such as mine as it covers the entire application area. It can be animated using ```animationType``` prop with three different values [```'none'```, ```'slide'```, ```'fade'```], ```transparent``` determines the modal background view, ```visible``` determines the visiblity of the modal, ```onRequestClose``` is a callback if the user taps on the back button on an Andriod device. It's a required to add it but I've callback to ```{useState}``` named ```'setAlertAddVisible'``` to which initiate it to ```false``` upon loading. This is implemented into the Save button and Delete button in the edit page. (Gifs on the screenshot section)

Upon submitting the details of the amiibo character, this modal will appear and will push whatever data that the user has key in the textboxes as well as the ```<RSPickerSelect>```. The ```let item = { imgHeadId: imgHeadID, imgTailId: imgTailID, character: character, series: series, releaseDate: releaseDate, presentBy: presentBy, desc: description };``` creates a temporary JSON object to te value of the data from the ```<TextInput>```. Than, based on the contents of the ```amiiboData``` from Data.js, the if statements shows that the ```amiiboData[0]``` is series from Super Smash Bro., ```amiiboData[1]``` is Super Mario Series and ```amiiboData[2]``` is Legend of Zelda: BOTW Series. Depending on the value that the user picked, the JSON object gets added to the appriopriate section of the ```amiiboData``` and will redirect the user back to the homepage.

-----------

HomePage & Add amiibo page:

![Homepage](https://github.com/user-attachments/assets/ab8a56f0-7984-4ede-83f7-1c259fb5b99b) <img src="https://github.com/user-attachments/assets/090fc670-3b7e-4fdd-b3ff-89ef87abbcdc" alt="Add an amiibo page" width="265" height="572"> 

Amiibo information page & Edit page:

<img src="https://github.com/user-attachments/assets/61031c28-a3c5-44bb-a844-2dd8fad2ae3a" alt="View amiibo information Page " width="265" height="572"> <img src="https://github.com/user-attachments/assets/c971da55-d4dd-4262-a108-55e401740830" alt="Edit amiibo Page" width="265" height="572"> 

Custom alerts (Changes saved & Delete confrimation)

<img src="https://github.com/user-attachments/assets/8a8b4b3b-4558-4131-8de4-21afe896d34a" alt="Custom Alert (Details saved)" width="265" height="572"> <img src="https://github.com/user-attachments/assets/5832f66c-2209-44c5-ba82-531024665859" alt="Custom Alert (Delete Confimation)" width="265" height="572"> 


Video walkthrough of the app:

[![Demo Recordeing w Voiceover](https://img.youtube.com/vi/drpVfr7rAnI/0.jpg)](https://www.youtube.com/watch?v=drpVfr7rAnI)

 
------------

You can find my apk file to download at the releases section beneath the about section at sidebar.
