
// save to file
saveData = (event) => {
    let fso;
    try {
        fso=new ActiveXObject("Scripting.FileSystemObject");
    } catch (e) {
        alert("not supported by browser");
        return;
    }
    let f1 = fso.createtextfile("\\1.txt",true);
    f1.write(text.replace("<br>","\n"));

};
