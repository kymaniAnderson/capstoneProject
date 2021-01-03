## Abstract    
As the number of biopsies increases, so does the need for the uro-pathologists who must examine these tissue samples and determine if there are any abnormalities present. This can be time-consuming and put a strain on pathology departments. However, advances in neural network architectures have led to the creation of convolutional neural networks (CNNs), which have proven to be a powerful architecture in the analysis of visual imagery. CNNs have, in recent times, been used to analyse image data from MRI scans and histopathological slides to detect the presence of cancer. 
This paper refers to an ongoing project with the primary objective of creating a device capable of digitizing histopathological prostate cells and sending the digitized data to a neural network model capable of classifying the sample as benign or malignant. A web interface is also to be created to display the output along with other patient data.
***Index Terms: Artificial Intelligence, Convolutional Neural Networks, Deep Learning/Neural Networks, Histopathological Slides, Image Classification, Prostate Cancer.***

## Objectives
Create a device capable of digitizing a histopathological slide and sending the digitized data to a neural network model capable of classifying the sample as benign or malignant. This output should be sent to a database along with: 
1. generated identification number of the slide
2. image of slide (.jpeg format)
3. date/time of upload
4. a web interface should be created where the uro-pathologist can view and update the data sent with other relevant patient information (such as name and notes).

## Realistic Design Constraints
### Economic Constraints
The total estimated budget for the project is $250USD with an additional $50USD for emergency situations such as excessive customs fees.
### Ethical and Legality Constraints
All guidelines as outlined by UWI Ethics Committee will be upheld in the handling of patient data. This will prevent the usage of any unnecessary data that the neural network model will not need to train from being obtained for use.
### Health and Safety Constraints
The camera and light used in order to digitize the samples will remain free from any form of radiation that would alter or harm the human tissue. The heat from the Raspberry Pi to be used should be managed well and should not cause any harm to the samples. The web interface will also contain user-authentication with a password in order to prevent unwanted persons from accessing patient data.
### Manufacturability and Sustainability Constraints
While more scalable structures will be used (such as MongoDB), in order to minimize costs and create a minimum viable product, there will be no use of any more server space than is necessary to handle the maximum number of users supported on the site at any given time.

