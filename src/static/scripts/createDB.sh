#!/bin/bash

#Current woring directory
#in_dir_1=$(pwd)
#in_dir_1="/run/media/imagine/Kangaroo/DATA"
in_dir_1="/media/backup2/DATA/"
#in_dir_2="/run/media/imagine/backups/kmc400/freeSurfer_Tracula"
#in_dir_2="/media/backup1/kmc400/freeSurfer_Tracula/"
in_dir_2="/media/backup2/freesurfer_tracula/"
#in_dir_3="/run/media/imagine/backups/kmc400/tractography_w_cerebellum"
#in_dir_3="/media/backup1/kmc400/tractography_w_cerebellum/"
in_dir_3="/media/backup2/camino/"
in_dir_4="/media/backup2/slicer/"
in_dir_5="/media/backup2/gregory_sabrina/"
in_dir_6="/media/backup2/nii/"


out_dir="/home/imagine/biblioteca-canguro_v2/data/"
json_dir="/home/imagine/biblioteca-canguro_v2/static/data/"
rm $out_dir* -rf
#rm $json_dir* -rf

#echo $in_dir_1
json_file=$out_dir"canguroData.json"
json_file_Anon=$out_dir"canguroData_Anon.json"
if [ -f $json_file ]; then
  rm $json_file
fi
if [ -f $json_file_Anon ]; then
  rm $json_file_Anon
fi


declare -A subjects_excel
# Create dic from excel file
while IFS="," read -r SubjectID Name Group Cedula
do 
#  echo "subjects_excel['${SubjectID}'] = ['${Name}', '${Group}']":w
  content=${Name}","${Group}","${Cedula}
  subjects_excel[${SubjectID}]=$content
done <"subjects_Excel.txt"

#echo "***"
# Get a record from dictionary
#content=${subjects_excel['1005']}
#echo $content

# Split record in an array
#IFS=',' read -r -a content_array <<< "$content"
#echo "${content_array[0]}"
#echo "${content_array[1]}"
#echo "${content_array[2]}"

echo "[" > $json_file
echo "[" > $json_file_Anon
exec < subjects_Final.txt
while read subject
do
  subject_record=${subjects_excel[$subject]}
  #echo $subject_record
  in_subject_dir1=$in_dir_1$subject
  #in_subject_dir2=$in_dir_2$subject
  in_subject_dir2=$in_dir_2
  #in_subject_dir3=$in_dir_3$subject
  in_subject_dir3=$in_dir_3
  in_subject_dir4=$in_dir_4
  in_subject_dir5=$in_dir_5
  in_subject_dir6=$in_dir_6
  
  out_subject_dir=$out_dir$subject
  mkdir $out_subject_dir

  echo "{" >> $json_file
  echo "{" >> $json_file_Anon

  # Split record in an array
  IFS=',' read -r -a record_array <<< "$subject_record"
  name=${record_array[0]}
  group=${record_array[1]}
  cedula=${record_array[2]}
  echo '"SubjectID": "'$subject'",' >> $json_file
  echo '"Name": "'$name'",' >> $json_file
  echo '"Cedula": "'$cedula'",' >> $json_file
  echo '"Group": "'$group'",' >> $json_file

  echo '"SubjectID": "'$subject'",' >> $json_file_Anon
  echo '"Name": "*****",' >> $json_file_Anon
  echo '"Cedula": "*****",' >> $json_file_Anon
  echo '"Group": "*****",' >> $json_file_Anon

  echo $subject
  # Dicom
  if [ -f $in_subject_dir1"/dicom.tar.gz" ]; then
    ln -s $in_subject_dir1"/dicom.tar.gz" $out_subject_dir"/"$subject"_dicom.tar.gz"
    echo '"Dicom": true,' >> $json_file
    echo '"Dicom": true,' >> $json_file_Anon
  else
    echo '"Dicom": false,' >> $json_file
    echo '"Dicom": false,' >> $json_file_Anon
  fi;

  # ATENCION
  if [ -f $in_subject_dir6$subject"_Atencion.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_Atencion.tar.gz" $out_subject_dir"/"$subject"_ATENCION.tar.gz"
    echo '"Atencion": true,' >> $json_file
    echo '"Atencion": true,' >> $json_file_Anon
  else
    echo '"Atencion": false,' >> $json_file
    echo '"Atencion": false,' >> $json_file_Anon
  fi;

  # COORDINACION
  if [ -f $in_subject_dir6$subject"_Coordinacion.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_Coordinacion.tar.gz" $out_subject_dir"/"$subject"_COORDINACION.tar.gz"
    echo '"Coordinacion": true,' >> $json_file
    echo '"Coordinacion": true,' >> $json_file_Anon
  else
    echo '"Coordinacion": false,' >> $json_file
    echo '"Coordinacion": false,' >> $json_file_Anon
  fi;

  # MEMORIA
  if [ -f $in_subject_dir6$subject"_Memoria.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_Memoria.tar.gz" $out_subject_dir"/"$subject"_MEMORIA.tar.gz"
    echo '"Memoria": true,' >> $json_file
    echo '"Memoria": true,' >> $json_file_Anon
  else
    echo '"Memoria": false,' >> $json_file
    echo '"Memoria": false,' >> $json_file_Anon
  fi;

  # MIEDO
  if [ -f $in_subject_dir6$subject"_Miedo.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_Miedo.tar.gz" $out_subject_dir"/"$subject"_MIEDO.tar.gz"
    echo '"Miedo": true,' >> $json_file
    echo '"Miedo": true,' >> $json_file_Anon
  else
    echo '"Miedo": false,' >> $json_file
    echo '"Miedo": false,' >> $json_file_Anon
  fi;

  # PRENSION
  if [ -f $in_subject_dir6$subject"_Prension.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_Prension.tar.gz" $out_subject_dir"/"$subject"_PRENSION.tar.gz"
    echo '"Prension": true,' >> $json_file
    echo '"Prension": true,' >> $json_file_Anon
  else
    echo '"Prension": false,' >> $json_file
    echo '"Prension": false,' >> $json_file_Anon
  fi;

  # MPRAGE
  if [ -f $in_subject_dir6$subject"_MPRAGE.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_MPRAGE.tar.gz" $out_subject_dir"/"$subject"_MPRAGE.tar.gz"
    echo '"MPRAGE": true,' >> $json_file
    echo '"MPRAGE": true,' >> $json_file_Anon
  else
    echo '"MPRAGE": false,' >> $json_file
    echo '"MPRAGE": false,' >> $json_file_Anon
  fi;

  # T1
  if [ -f $in_subject_dir6$subject"_T1.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_T1.tar.gz" $out_subject_dir"/"$subject"_T13D.tar.gz"
    echo '"T13D": true,' >> $json_file
    echo '"T13D": true,' >> $json_file_Anon
  else
    echo '"T13D": false,' >> $json_file
    echo '"T13D": false,' >> $json_file_Anon
  fi;

  # T2
  if [ -f $in_subject_dir6$subject"_T2.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_T2.tar.gz" $out_subject_dir"/"$subject"_T23D.tar.gz"
    echo '"T23D": true,' >> $json_file
    echo '"T23D": true,' >> $json_file_Anon
  else
    echo '"T23D": false,' >> $json_file
    echo '"T23D": false,' >> $json_file_Anon
  fi;

  # Flair
  if [ -f $in_subject_dir6$subject"_Flair.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_Flair.tar.gz" $out_subject_dir"/"$subject"_FLAIR.tar.gz"
    echo '"FLAIR": true,' >> $json_file
    echo '"FLAIR": true,' >> $json_file_Anon
  else
    echo '"FLAIR": false,' >> $json_file
    echo '"FLAIR": false,' >> $json_file_Anon
  fi;

  # DTI
  if [ -f $in_subject_dir6$subject"_DTI.tar.gz" ]; then
    ln -s $in_subject_dir6$subject"_DTI.tar.gz" $out_subject_dir"/"$subject"_DTI.tar.gz"
    echo '"DTI": true,' >> $json_file
    echo '"DTI": true,' >> $json_file_Anon
  else
    echo '"DTI": false,' >> $json_file
    echo '"DTI": false,' >> $json_file_Anon
  fi;

  # Freesurfer
  if [ -f $in_subject_dir2"/"$subject".tar.gz" ]; then
    ln -s $in_subject_dir2$subject".tar.gz" $out_subject_dir"/"$subject"_Freesurfer_Tracula.tar.gz"
    echo '"Freesurfer": true,' >> $json_file
    echo '"Freesurfer": true,' >> $json_file_Anon
  else
    echo '"Freesurfer": false,' >> $json_file
    echo '"Freesurfer": false,' >> $json_file_Anon
  fi;

  # Tractography
  if [ -f $in_subject_dir3"/"$subject".tar.gz" ]; then
    ln -s $in_subject_dir3$subject".tar.gz" $out_subject_dir"/"$subject"_Camino.tar.gz"
    echo '"Camino": true,' >> $json_file
    echo '"Camino": true,' >> $json_file_Anon
  else
    echo '"Camino": false,' >> $json_file
    echo '"Camino": false,' >> $json_file_Anon
  fi;

  # Slicer
  if [ -f $in_subject_dir4"/"$subject".tar.gz" ]; then
    ln -s $in_subject_dir4$subject".tar.gz" $out_subject_dir"/"$subject"_Slicer.tar.gz"
    echo '"Slicer": true,' >> $json_file
    echo '"Slicer": true,' >> $json_file_Anon
  else
    echo '"Slicer": false,' >> $json_file
    echo '"Slicer": false,' >> $json_file_Anon
  fi;

  # Fear Sabrina
  if [ -f $in_subject_dir5"/"$subject".tar.gz" ]; then
    ln -s $in_subject_dir5$subject".tar.gz" $out_subject_dir"/"$subject"_FearSabrina.tar.gz"
    echo '"FearSabrina": true' >> $json_file
    echo '"FearSabrina": true' >> $json_file_Anon
  else
    echo '"FearSabrina": false' >> $json_file
    echo '"FearSabrina": false' >> $json_file_Anon
  fi;

  echo "}," >> $json_file
  echo "}," >> $json_file_Anon


done
# Remove last  line
sed -i '$ d' $json_file
sed -i '$ d' $json_file_Anon
# Fix last closing parantesis
echo "}" >> $json_file
echo "}" >> $json_file_Anon
# Finish whole json
echo "]" >> $json_file
echo "]" >> $json_file_Anon

#Move json file to its final destination
mv $json_file $json_dir
mv $json_file_Anon $json_dir

