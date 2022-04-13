#!/usr/bin/python

# Nicholas Polys, Virginia Tech
# October 2017
#

from laspy.file import File
import numpy as np
import sys
import os

# import csv

import random

# from xml.etree.ElementTree import Element, SubElement, Comment, tostring
import datetime

# try:
#    from cStringIO import StringIO
# except:
#    from io import StringIO

generated_on = str(datetime.datetime.now())
# from xml.dom import minidom
# from ElementTree_pretty import prettify


arg1 = sys.argv[1]    # the file name
arg2 = sys.argv[2]	  # the lower bound for the interval
arg3 = sys.argv[3]    # the uppper bound for the interval
arg4 = sys.argv[4]	  # the amount of points in the list
arg5 = sys.argv[5]	  # the output file

intense = 0
colo = 0
normo = 0
classo = 0
usr_dat = 0

print(arg1, arg2, arg3, arg4)

# NOTE - extract LAS from LAZ first

inFile = File(arg1, mode='r')


print('\nHeader \n')
# Lets take a look at the header also.
headerformat = inFile.header.header_format
for spec in headerformat:
    print(spec.name)

print(inFile.header.offset)


# Find out what the point format looks like.
pointformat = inFile.point_format
print('\nPoints \n')
for spec in inFile.point_format:
    print(spec.name)
    if spec.name == 'intensity':
        intense = 1
    if spec.name == 'red':
        colo = 1
    # if spec.name == 'x_normal'
    #	normo = 1
    if spec.name == 'raw_classification':
        classo = 1
    if spec.name == 'user_data':
        usr_dat = 1


# Like XML or etree objects describing the header instead?

# a_mess_of_xml = pointformat.xml()
# an_etree_object = pointformat.etree()
# print (an_etree_object)
# print (a_mess_of_xml)


#  we can grab:
# blue = inFile.blue


# Coordinate.point


# OK get some points and do something
# point_records = inFile.points

# print (point_records)
# I = inFile.Classification == 2

# Grab the offset x, y, and z dimensions and stick them together
# in an nx3 numpy array

coords = np.vstack((np.subtract(inFile.x, inFile.header.offset[0]), np.subtract(
    inFile.y, inFile.header.offset[1]), np.subtract(inFile.z, inFile.header.offset[2]))).transpose()

print(len(coords))

# new_X coords = np.subtract

# Manage intensity / color

# inFile.R inFile.G inFile.B inFile.intensity

# OUTPUT X3D

##########################
# prepare X3D coords as string

# out = bytearray()
# for i in coords:
#    out += i.vsplit

np.set_printoptions(threshold=sys.maxsize)
# print (coords)

# np.savetxt('testout.pts', (coords), delimiter='',)

# coords.tofile('testout.pts',sep=", ",format="%s")


# 													this works

# f = open('testout.pts', 'w')
# ll = coords.shape[0]
# print ll
# for block in range(0,ll):
#	for n in range(0, 3):
#		f.write(str(coords[block][n]))
#		f.write(' ')  # spacer
#       #np.savetxt(f, block, '%s' ) # write to open file
#	f.write(str(', '))  # another spacer
# f.close()
#
#
# 					this works too and seems faster, HOWEVER every data entry is on a new line

counter = 1
# print(counter)

# lower = int(arg2) # if we are using pointListGeneratorUniform
# upper = int(arg3)

mean = int(arg2)   # if we are using pointListGeneratorNormal
stDev = int(arg3)


# This is one method I think would be interesting to test to see if it
# works with removing those lines
def pointListGeneratorUniform(lowerBound, upperBound, amount):
    result = []
    i = 0
    while i <= amount:
        result.append(int(random.randrange(lowerBound, upperBound)))
        i += 1
    return result


def pointListGeneratorNormal(mean, stDev, amount):
    result = np.random.normal(mean, stDev, amount)
    return result


amount = int(arg4)

# pointList = pointListGeneratorUniform(lower, upper, amount)

pointList = pointListGeneratorNormal(mean, stDev, amount)
print("pointList: " + pointList)

with open('CoordsOut.pts', 'w') as outfile:
    i = 0
    for data_slice in coords:
        # print(counter)
        # The formatting string indicates that I'm writing out
        # the values in left-justified columns 7 characters in width
        # with 2 decimal places.
        # np.savetxt(outfile, data_slice, fmt='%-7.2f')
        if counter == pointList[i]:
            np.savetxt(outfile, data_slice, fmt='%-7.2f')
            if (i == len(pointList)):
                i = 0
            else:
                i += 1
        # Writing out a break to indicate different slices...
        # outfile.write('# New slice\n')
            outfile.write(', ')
            counter = 1
            # print('written')
        else:
            # nothing
            counter += 1
            # print ('skipped')


print('Coordinates written')
# INTENSITY or Color


def dumpIntensity(daFile):
    inte = np.vstack(daFile.intensity)
    counter = 1
    i = 0
    with open('IntensityAsRGBOut.pts', 'w') as outfile:
        for dat in inte:
            # if counter == base:
            if counter == pointList[i]:
                # One solution is to make
                # base = random number in an interval
                # + or - some percentage of itself,
                # but if the intensity points
                # need to correspond to the color points,
                # then how do we make sure that the points
                # add up and aren't Intensity = 49, Color = 56
                # or something like that?
                # Or maybe we make a list [45, 50, 55]
                # and have the two loop through such that
                # it will take the 45th point, 50th point, 55th point.
                # Mainly, does it matter if the intensity points
                # don't align with the color points?
                # scaled =  str(dat[0]/ 256)
                # np.savetxt(outfile, scaled)
                scaled_rgb = str(dat[0]/256)  # /256.0
                outfile.write(scaled_rgb+" " + scaled_rgb+" "+scaled_rgb)
                outfile.write(', ')
                if (i == len(pointList)):
                    i = 0
                else:
                    i += 1
                counter = 1
                # print('written')
            else:
                # nothing
                counter += 1
                # print ('skipped')
    print('Intensity written')
    return


if intense == 1:
    dumpIntensity(inFile)

# 16 bit color is 0 - 65536


def dumpColor(daFile):
    colour = np.vstack((daFile.red, daFile.green, daFile.blue)).transpose()
    counter = 1
    i = 0
    with open('ColorOut.pts', 'w') as outfile:
        for data_slice in colour:
            if counter == pointList[i]:
                scaled_slice = np.divide(data_slice, 65536.0)
                # data_slice[0] = data_slice[0]/65536.0
                # data_slice[1] = data_slice[1]/65536.0
                # data_slice[2] = data_slice[2]/65536.0
                np.savetxt(outfile, scaled_slice, fmt='%-1.4f')

                outfile.write(', ')
                counter = 1
                if (i == len(pointList)):
                    i = -1
                i += 1
                # print('written')
            else:
                # nothing
                counter += 1
                # print ('skipped')
    print('Color written')
    return

# if colo == 1:
#	dumpColor(inFile)


if usr_dat == 1:
    print('user_data here\n')


if classo == 1:
    print('classification here\n')


# collect X3D FILE


# os.system("cat X3D_Frag1.txt CoordsOut.pts X3D_Frag_Color.txt IntensityAsRGBOut.pts X3D_End.txt > "+arg3 )

os.system("cat X3D_Frag1.txt CoordsOut.pts X3D_Frag_Color.txt IntensityAsRGBOut.pts X3D_End.txt > "+arg3)


# file = open ("out_test.x3d","w" )
# file.write("Why? Because we can.")
# file.close()


##########################
# prepare X3D as XML

# root = Element('X3D')
# root.set('version', '3.3')


# prepare X3D a

# print  tostring(root)


# OUT PUT LAS

# outFile = File('testout.las', mode='w', header=inFile.header)

# outFile.points = inFile.points[I]
# outFile.points = point_records

# outFile.close()

print("Done")
