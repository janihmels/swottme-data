
<?php

    $nClips = 27;
    $cnt=0;
    
    $fwrite = fopen("result.txt", 'w');

    for($ii=1;$ii<=$nClips;$ii++) {
        $running=0;
        $fread = fopen("./tsv-files/CHAPTERS - Chapter {$ii}.tsv", 'r');
        while(!feof($fread)) {
            $line = fgets($fread);
            if($line&&$running) {
                $line_items = explode("\t",$line);
                $eng = $line_items[2];
                $chn = $line_items[3];
                $clip = $line_items[5];
                if($eng && $chn && $clip) 
                    fprintf($fwrite,"%d\t%d\t%s\t%s\t%s\n",$ii,++$cnt,$eng,$chn,$clip);
            }
            $running++;
        }
        fclose($fread);

    }
    fclose($fwrite);    

?>