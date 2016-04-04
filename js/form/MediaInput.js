var MediaInput = {
    controller: function(file){
        this.picture = false;
        this.file = file;
        this.dataUrl = "";

        this.getFile = function(e){

            var input = document.createElement("input");

            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function(){
                var reader = new FileReader();
                this.file(input.files[0]);

                reader.onload = function(e) {
                    this.dataUrl = e.target.result;
                    m.redraw();
                }.bind(this);

                reader.readAsDataURL(input.files[0]);
            }.bind(this);
            input.click();
        };

        this.takePicture = function(e){
            console.log("take picture");
        };
    },
    view: function(ctrl){
        return m("div", [
            m.component(InputLabel, {name: "Foto", icon: "camera"}),
            function(){
                if(ctrl.file() !== undefined){
                    return m("div", {class:"media-box image"}, [
                        m("img", {src: ctrl.dataUrl}),
                        m("button", {onclick: ctrl.getFile.bind(ctrl)}, "Andere Foto")
                    ]);
                } else {
                    return m("div", {class:"media-box"}, [
                        m("button", {onclick: ctrl.getFile.bind(ctrl)} ,"Selecteer Foto")
                    ]);
                }
            }()

        ]);
    }
};
