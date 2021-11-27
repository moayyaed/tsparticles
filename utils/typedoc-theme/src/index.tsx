import type { Application } from "typedoc";
import { JSX } from "typedoc";

export function load(app: Application): void {
  app.renderer.hooks.on("head.end", () => {
    const clarity = `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "8q4bxin4tm");`;

    return (
      <div>
        <script type="text/javascript">
          <JSX.Raw html={clarity} />
        </script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1784552607103901"
          crossOrigin="anonymous"
        />
      </div>
    );
  });
}
