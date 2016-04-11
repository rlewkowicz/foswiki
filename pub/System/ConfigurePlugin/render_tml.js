var TML={STYLING:[[/(^|[\s(])\{(\S+?|\S[^\n]*?\S)\}($|(?=[\s,.;:!?)]))/g,"$1<strong><code>{$2}</code></strong>"],[/(^|[\s\(])\*(\S+?|\S[^\n]*?\S)\*(?:$|(?=[\s,.;:!?\)]))/g,"$1<strong>$2</strong>"],[/(^|[\s\(])\_(\S+?|\S[^\n]*?\S)\_(?:$|(?=[\s,.;:!?\)]))/g,"$1<em>$2</em>"],[/(^|[\s\(])\=(\S+?|\S[^\n]*?\S)\=(?:$|(?=[\s,.;:!?\)]))/g,"$1<code>$2</code>"],[/\[\[([^\]]+)\]\]/g,'<a target="_blank" href="$1">$1</a>'],[/\[\[([^\]]+)\]\[([^\]]+)\]\]/g,'<a target="_blank" href="$1">$2</a>']],render:function(text){var removed,lines,in_table,in_list,list_type,i,j,m,line,cols;removed=[];text=text.replace(/<verbatim>((.|\n)*?)<\/verbatim>/g,function(m,$1){$1=$1.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");removed.push("<pre>"+$1+"</pre>");return"PLACEHOLDER"+(removed.length-1)+";"}).replace(/(<(button|select|option|textarea)\b(?:.|\n)*?<\/\1>)/g,function(m,$1){removed.push($1);return"PLACEHOLDER"+(removed.length-1)+";"}).replace(/^>(.*)$/gm,'<p class="one_line_report"> $1 </p>');lines=text.split(/\n/);in_table=false;in_list=false;for(i=0;i<lines.length;i++){line=lines[i];if(/^\s*$/.test(line)){if(in_list){lines.splice(i++,0,"</"+list_type+">");in_list=false}else if(in_table){lines.splice(i++,0,"</table>");in_table=false}lines[i]="<br />";continue}for(j=0;j<TML.STYLING.length;j++){line=line.replace(TML.STYLING[j][0],TML.STYLING[j][1])}lines[i]=line;m=/^(?: {3}|\t)(\*|\d) (.*)$/.exec(line);if(m){lines[i]=line.replace(/^( {3}|\t)\*|\d /,"");if(!in_list){list_type=m[1]==="*"?"ul":"ol";if(in_table){lines.splice(i++,0,"</table>");in_table=false}lines.splice(i++,0,"<"+list_type+">");in_list=true}lines.splice(i++,0,"<li>");lines.splice(++i,0,"</li>");continue}m=/^\|(.*)\|$/.exec(line);if(m){cols=line.split(/\|/);cols.shift();cols.pop();if(in_list){lines.splice(i++,0,"</"+list_type+">");in_list=false}if(!in_table){lines.splice(i++,0,'<table class="tml">');in_table=true}lines.splice(i++,0,"<tr><td>");lines[i]=cols.join("</td><td>");lines.splice(++i,0,"</td></tr>");continue}if(in_list){if(!/^( {3}|\t)/.test(line)){lines.splice(i++,0,"</"+list_type+">");in_list=false}}else if(in_table){lines.splice(i++,0,"</table>");in_table=false}m=/^---(\++) (.*)$/.exec(line);if(m){lines[i]="<h"+m[1].length+">"+m[2]+"</h"+m[1].length+">"}}if(in_list){lines.push("</"+list_type+">")}else if(in_table){lines.push("</table>")}text=lines.join(" ");return text.replace(/PLACEHOLDER(\d+);/g,function(m,idx){return removed[idx]})},render_reports:function(reports){var i,curClass,html="",pending="";for(i=0;i<reports.length;i++){if(reports[i].level!==curClass){if(pending.length>0){html+='<div class="'+curClass+'">'+TML.render(pending)+"</div>";pending=""}curClass=reports[i].level}pending+=reports[i].text+"\n"}if(pending.length>0){html+='<div class="'+curClass+'">'+TML.render(pending)+"</div>"}return html}};