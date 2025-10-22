import {Froyo, html} from '../lib/froyo.js';

export class ArticleParticipation extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h3 part="h3">Participation</h3>
        <p part="p">Strong visual design has always been our focus.
        You are modifying this page, so strong
        <abbr title="Cascading Style Sheets">CSS</abbr>
        skills are necessary too, but the example files are commented well enough
        that even <abbr title="Cascading Style Sheets">CSS</abbr>
        novices can use them as starting points. Please see the
        <a part="a" href="http://www.mezzoblue.com/zengarden/resources/"
        title="A listing of CSS-related resources">
        <abbr title="Cascading Style Sheets">CSS</abbr> Resource Guide</a>
        for advanced tutorials and tips on working with
        <abbr title="Cascading Style Sheets">CSS</abbr>.</p>
        <p part="p">You may modify the style sheet in any way you wish, but
        not the <abbr title="HyperText Markup Language">HTML</abbr>.
        This may seem daunting at first if you&#8217;ve never worked this way before,
        but follow the listed links to learn more, and use the sample files as a guide.</p>
        <p part="p">Download the sample
        <a part="a" href="/examples/index" title="This page's source HTML code, not
        to be modified.">HTML</a> and <a part="a" href="/examples/style.css"
        title="This page's sample CSS, the file you may modify.">CSS</a>
        to work on a copy locally. Once you have completed your masterpiece
        (and please, don&#8217;t submit half-finished work) upload your
        <abbr title="Cascading Style Sheets">CSS</abbr>
        file to a web server under your control.
        <a part="a" href="http://www.mezzoblue.com/zengarden/submit/"
        title="Use the contact form to send us your CSS file">Send us a link</a> to
        an archive of that file and all associated assets, and if we choose
        to use it we will download it and place it on our server.</p>
      `;
    };

}

customElements.define('article-participation', ArticleParticipation);
