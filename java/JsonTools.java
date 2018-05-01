import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 处理json的工具类.
 * @author dogstar
 */
public class JsonTools {

        public static String listToJson(ArrayList<ArrayList<String>> arrayList) {
                StringBuffer jsonBuffer = new StringBuffer();
                jsonBuffer.append("[");

                Iterator<ArrayList<String>> it = arrayList.iterator();
                while(it.hasNext()) {
                        ArrayList<String> tmp = it.next();
                        // TODO: 这里暂时未处理特殊符号，需要转义 
                        jsonBuffer.append("[\"" + tmp.get(0) + "\",\"" + tmp.get(1) + "\",\"" + tmp.get(2) + "\"]");
                        if (it.hasNext()) {
                                jsonBuffer.append(",");
                        }
                }
                jsonBuffer.append("]");
                return jsonBuffer.toString();
        }

        //test
        public static void main(String[] args) {
                ArrayList<String> where1 = new ArrayList<String>();
                where1.add("id");
                where1.add(">");
                where1.add("1");

                ArrayList<String> where2 = new ArrayList<String>();
                where2.add("id");
                where2.add("<=");
                where2.add("10");

                ArrayList<ArrayList<String>> wheres = new ArrayList<ArrayList<String>>();
                wheres.add(where1);
                wheres.add(where2);

                String json = listToJson(wheres);
                System.out.println(json);

                // [["id",">","1"],["id","<=","10"]]

        }
}
