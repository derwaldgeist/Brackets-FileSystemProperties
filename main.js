/*
 * Copyright (c) 2014 Andrew MacKenzie
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true,  regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, marked, _hideSettings */


define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var CommandManager      = brackets.getModule("command/CommandManager"),
        Menus               = brackets.getModule("command/Menus"),
        ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
		NodeDomain			= brackets.getModule("utils/NodeDomain"),
        ProjectManager      = brackets.getModule("project/ProjectManager");

    var contextMenu         = Menus.getContextMenu(Menus.ContextMenuIds.PROJECT_MENU);

    var fsDomain = new NodeDomain("fsDomain", ExtensionUtils.getModulePath(module, "node/fsDomain"));

    function showProperties() {
        var selectedItem;

        selectedItem = ProjectManager.getSelectedItem();
        // console.log(selectedItem._path);
        fsDomain.exec("getFileProperties", selectedItem._path)
            .done(function (stats) {
                console.log(stats);
            }).fail(function (err) {
                console.error("error in fs.stat: " + err);
            });



    }

    CommandManager.register("Properties", "mackenza.cmdShowProperties", showProperties);
    contextMenu.addMenuItem("mackenza.cmdShowProperties", "", Menus.LAST);

});
