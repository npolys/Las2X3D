#!/usr/bin/python

# Nicholas Polys, Virginia Tech
# October 2017
#

from laspy.file import File
import numpy as np
import sys
import os

#import csv

#from xml.etree.ElementTree import Element, SubElement, Comment, tostring
import datetime

#try:
#    from cStringIO import StringIO
#except:
#    from io import StringIO

generated_on = str(datetime.datetime.now())
#from xml.dom import minidom
#from ElementTree_pretty import prettify


arg1 = sys.argv[1]   #the file name
arg2 = sys.argv[2]	  # the sampling interval for output
arg3 = sys.argv[3]	  # the output file
intense = 0
colo = 0
normo = 0
classo = 0
usr_dat = 0

print (arg1, arg2)

# NOTE - extract LAS from LAZ first

inFile = File(arg1, mode='r')


print ('\nHeader \n')

#inFile = File(arg1, mode='r')
inFile = laspy.read(arg1)

print ('\nHeader \n')
#Lets take a look at the header also.
print (inFile.header)

	
# Find out what the point format looks like.
pointformat = inFile.point_format
print ('\nPoints \n')
for spec in inFile.point_format:
	print(spec.name)
	if spec.name == 'intensity':
		intense = 1
	if spec.name == 'red':
		colo = 1
	#if spec.name == 'x_normal'
	#	normo = 1
	if spec.name == 'raw_classification':
		classo = 1
	if spec.name == 'user_data':
		usr_dat = 1
	
	
#Like XML or etree objects describing the header instead?

#a_mess_of_xml = pointformat.xml()
#an_etree_object = pointformat.etree()
#print (an_etree_object)
#print (a_mess_of_xml)


#  we can grab:
# blue = inFile.blue


############################################### Coordinate.point


# OK get some points and do something
#point_records = inFile.points

#print (point_records)
#I = inFile.Classification == 2

# Grab the offset x, y, and z dimensions and stick them together
# in an nx3 numpy array

coords = np.vstack(( np.subtract(inFile.x, inFile.header.offset[0]), np.subtract(inFile.y, inFile.header.offset[1]) , np.subtract(inFile.z, inFile.header.offset[2]))).transpose()

print (len(coords))

#new_X coords = np.subtract

# Manage intensity / color 

#inFile.R inFile.G inFile.B inFile.intensity

########################## OUTPUT X3D

########################## 
# prepare X3D coords as string

#out = bytearray()
#for i in coords:
#    out += i.vsplit 

np.set_printoptions(threshold=sys.maxsize)
#print (coords)

#np.savetxt('testout.pts', (coords), delimiter='',)

#coords.tofile('testout.pts',sep=", ",format="%s")


# 													this works

#f = open('testout.pts', 'w')
#ll = coords.shape[0]
#print ll
#for block in range(0,ll):
#	for n in range(0, 3):
#		f.write(str(coords[block][n]))
#		f.write(' ')  # spacer    
#       #np.savetxt(f, block, '%s' ) # write to open file
#	f.write(str(', '))  # another spacer
#f.close()
#
#
# 					this works too and seems faster, HOWEVER every data entry is on a new line

counter = 1
base = int(arg2)
numPoints = 0

#print (counter)

with open('CoordsOut.pts', 'w') as outfile:
    for data_slice in coords:
		#print(counter)
        # The formatting string indicates that I'm writing out
        # the values in left-justified columns 7 characters in width
        # with 2 decimal places.  
        #np.savetxt(outfile, data_slice, fmt='%-7.2f')
		if counter == base:
			np.savetxt(outfile, data_slice, fmt='%-7.2f')
        # Writing out a break to indicate different slices...
        #outfile.write('# New slice\n')
			outfile.write(', ')
			counter = 1
			numPoints += 1
			#print('written')
		else:
			#nothing
			counter+=1
			#print ('skipped')

			
print('Coordinates written for '+ numPoints)			
###############################################   INTENSITY or Color

def dumpIntensity (daFile, b):
	inte = np.vstack(daFile.intensity)
	numCol = 0
	counter = 1
	with open('IntensityAsRGBOut.pts', 'w') as outfile:
		for dat in inte:

			if counter == base:
				#scaled =  str(dat[0]/ 256)
				#np.savetxt(outfile, scaled)
				#print (dat[0]);
				scaled_rgb = str(dat[0]/232.0 * 2.0)   #/256.0?
				outfile.write(scaled_rgb+" " +scaled_rgb+" "+scaled_rgb)
				outfile.write(", ")
				counter = 1
				numCol += 1
				#print('written')
			else:
				#nothing
				counter+=1
				#print ('skipped')
	print('Intensity written for '+ numCol)
	return;
   
   
#if intense ==1:
	dumpIntensity(inFile, base)
	
# 16 bit color is 0 - 65536	
	
def dumpColor (daFile, b):
	colour = np.vstack((daFile.red, daFile.green, daFile.blue)).transpose()  
	counter = 1
	with open('ColorOut.pts', 'w') as outfile:
		for data_slice in colour:
			if counter == base:
				scaled_slice = np.divide(data_slice, 65536.0)
				#data_slice[0] = data_slice[0]/65536.0
				#data_slice[1] = data_slice[1]/65536.0
				#data_slice[2] = data_slice[2]/65536.0
				np.savetxt(outfile, scaled_slice, fmt='%-1.4f')

				outfile.write(', ')
				counter = 1
				#print('written')
			else:
				#nothing
				counter+=1
				#print ('skipped')
	print('Color written')
	return;
   
#if colo ==1:
#	dumpColor(inFile, base)





if usr_dat ==1:
	print('user_data here\n')


if classo ==1:
	print('classification here\n')





########################## ##########################  collect X3D FILE 


#os.system("cat X3D_Frag1.txt CoordsOut.pts X3D_Frag_Color.txt IntensityAsRGBOut.pts X3D_End.txt > "+arg3 )

os.system("cat X3D_Frag1.txt CoordsOut.pts X3D_Frag_Color.txt IntensityAsRGBOut.pts X3D_End.txt > "+arg3 )


#file = open ("out_test.x3d","w" )
#file.write("Why? Because we can.")
#file.close() 


########################## 
# prepare X3D as XML

#root = Element('X3D')
#root.set('version', '3.3')


# prepare X3D a

#print  tostring(root)



########################## OUT PUT LAS

#outFile = File('testout.las', mode='w', header=inFile.header)

#outFile.points = inFile.points[I]
#outFile.points = point_records

#outFile.close()

print ("Done")
