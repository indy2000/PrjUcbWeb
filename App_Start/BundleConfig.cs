using System.Web;
using System.Web.Optimization;

namespace PrjUcbWeb
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            //**************** Layout ******************
            bundles.Add(new StyleBundle("~/Content/csslayout").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/ionicons.min.css",
                      "~/Content/AdminLTE.min.css",
                      "~/Content/all-skins.min.css",
                      "~/Content/theme.css",
                      "~/Content/icofont.css",
                      "~/Content/material-icons.css",
                      "~/Content/style.css",
                      "~/Content/line-awesome.css",
                      "~/Content/font-eva.css"
                      ));

            //**************** Layout Limpo ******************
            bundles.Add(new StyleBundle("~/Content/csslayoutlimpo").Include(
                      "~/Content/DataTables/Bootstrap-4-4.1.1/css/bootstrap.min.css",
                      "~/Content/jquery-ui.min.css",
                      "~/Content/line-awesome.css",
                      "~/Content/ionicons.min.css",
                      "~/Content/all-skins.min.css",
                      "~/Content/animate.css",
                      "~/Content/theme.css",
                      "~/Content/Financeiro.css",
                      "~/Content/icofont.css",
                      "~/Content/material-icons.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/roboto.css",
                      "~/Content/bootstrap-datepicker.css",
                      "~/Content/toast/mk-notifications.css",
                      "~/Content/toast/mk-theme-more.css",
                      "~/Content/bootstrap4-toggle.min.css",
                      "~/Content/bootstrap-tagsinput.css",
                      "~/Content/connect.css",
                      "~/Content/bootstrap-datepicker.css",
                      "~/Content/select2/select2.css"));


            bundles.Add(new ScriptBundle("~/bundles/jslayoutlimpo").Include(
                        "~/Scripts/jquery-3.3.1.min.js",
                        "~/Scripts/jquery.mask.min.js",
                        "~/Scripts/popper.min.js",
                        "~/Scripts/bootstrap.4.1.1.min.js",
                        "~/Scripts/jquery-ui.min.js",
                        "~/Scripts/all.js",
                        "~/Scripts/sweetalert2@8.js",
                        "~/Content/toast/mk-notifications.js",
                        "~/Scripts/moment.js",
                        "~/Scripts/dinero.min.js",
                        "~/Scripts/connect.js",
                        "~/Scripts/Financeiro.js",
                        "~/Scripts/apexcharts.min.js",
                        "~/Scripts/bootstrap4-toggle.min.js",
                        "~/Scripts/bootstrap-tagsinput.js",
                        "~/Scripts/bootstrap-datepicker.min.js",
                        "~/Scripts/bootstrap-datepicker.pt-BR.min.js",
                        "~/Content/select2/select2.min.js",
                        "~/Content/select2/i18n/pt.js"
                        ));

            //**************** DataTable ******************
            bundles.Add(new StyleBundle("~/Content/cssDataTable").Include(
                      "~/Content/DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css"));


            bundles.Add(new ScriptBundle("~/bundles/jsDataTable").Include(
                        "~/Content/DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js",
                        "~/Content/DataTables/pdfmake-0.1.36/pdfmake.min.js",
                        "~/Content/DataTables/pdfmake-0.1.36/vfs_fonts.js",
                        "~/Content/DataTables/Buttons-1.5.4/js/buttons.print.min.js",
                        "~/Content/DataTables/Buttons-1.5.4/js/dataTables.buttons.min.js",
                        "~/Content/DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js",
                        "~/Content/DataTables/Buttons-1.5.4/js/buttons.flash.min.js",
                        "~/Content/DataTables/JSZip-2.5.0/jszip.min.js",
                        "~/Content/DataTables/Buttons-1.5.4/js/buttons.html5.js",
                        "~/Content/DataTables/Scroller-1.5.0/js/dataTables.scroller.min.js",
                        "~/Content/DataTables/FixedHeader-3.1.4/js/fixedHeader.dataTables.js",
                        "~/Content/DataTables/dataTables.scrollResize.js"));

            bundles.Add(new StyleBundle("~/Content/cssDataTable2").Include(
                      "~/Content/DataTables2.0/DataTables-1.10.20/css/dataTables.bootstrap4.min.css"));


            bundles.Add(new ScriptBundle("~/bundles/jsDataTable2").Include(
                        "~/Content/DataTables2.0/DataTables-1.10.20/js/jquery.dataTables.min.js",
                        "~/Content/DataTables2.0/pdfmake-0.1.36/pdfmake.min.js",
                        "~/Content/DataTables2.0/pdfmake-0.1.36/vfs_fonts.js",
                        "~/Content/DataTables2.0/Buttons-1.6.0/js/buttons.print.min.js",
                        "~/Content/DataTables2.0/Buttons-1.6.0/js/dataTables.buttons.min.js",
                        "~/Content/DataTables2.0/DataTables-1.10.20/js/dataTables.bootstrap4.min.js",
                        "~/Content/DataTables2.0/Buttons-1.6.0/js/buttons.flash.min.js",
                        "~/Content/DataTables2.0/JSZip-2.5.0/jszip.min.js",
                        "~/Content/DataTables2.0/Buttons-1.6.0/js/buttons.html5.min.js",
                        "~/Content/DataTables2.0/Scroller-2.0.1/js/dataTables.scroller.min.js",
                        "~/Content/DataTables2.0/FixedHeader-3.1.6/js/fixedHeader.dataTables.js",
                        "~/Content/DataTables/dataTables.scrollResize.js"));


            bundles.Add(new ScriptBundle("~/bundles/jsDataTableSimples").Include(
                        "~/Content/DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
