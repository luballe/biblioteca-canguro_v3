#!/bin/bash
subjects=$1
files=$2
outfilename=$3

inpath='/home/imagine/biblioteca-canguro_v2/data/'
outpath='/home/imagine/biblioteca-canguro_v2/static/temp/'


#Remove leading '['
subjects=${subjects#"["}
files=${files#"["}
#Remove trailing ']'
subjects=${subjects%"]"}
files=${files%"]"}
#echo -n "" > /home/imagine/biblioteca-canguro_v2/static/scripts/compressFiles/result.log
IFS=',' read -r -a subjects <<< "$subjects"
IFS=',' read -r -a files <<< "$files"

for subject in "${subjects[@]}"
do
  subject=${subject#'"'}
  subject=${subject%'"'}
  for file in "${files[@]}"
  do
    file=${file#'"'}
    file=${file%'"'}
    #echo "$file" >> /home/imagine/biblioteca-canguro_v2/static/scripts/compressFiles/result.log
    cmd='zip -jr '$outpath$outfilename' '$inpath$subject'/'$subject'_'$file
    #cmd='zip -jr /home/imagine/biblioteca-canguro_v2/static/scripts/compressFiles/'$outfilename
    eval $cmd
    #echo $cmd >> /home/imagine/biblioteca-canguro_v2/static/scripts/compressFiles/result.log
  done

done


rm_cmd="rm "$outpath$outfilename
echo $rm_cmd > $outpath"rm_cmd.txt"
#at now + 1 minute -f $outpath"rm_cmd.txt"
at now + 1 day -f $outpath"rm_cmd.txt"
rm $outpath"rm_cmd.txt"
