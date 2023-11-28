public class waduheck {
    private static boolean check_flag(String s) {
        char[] cs = s.toCharArray();
        char[] waduheck = new char[cs.length];
        int n = cs.length ^ waduheck.length;
        char[] heckValue = "32211384994824779923154315855248241855438511513539758136787469974".toCharArray();

        while (true) {

            try {
                if (heckValue[n] - cs[n % cs.length] < 0)
                    waduheck[n] = (char) (heckValue[n] - cs[n % cs.length] % 128);
                else
                    waduheck[n] = (char) (heckValue[n] - cs[n % cs.length] % 255);

                n++;
            } catch (Throwable t) {
                break;
            }
        }

        return "\uffcf\uffbd\uffcf\uffbd\uffcb\uffb8\uffc4\uffcc\u0005\uffc5\uffd5\uffc1\ufffe\uffc1\uffd8\uffd1\uffc4\uffcb\u0011\uffd4\uffc5\u0002\uffc0\uffc0\uffd2\uffc1\uffc6\uffbc\uffd6\uffbf\u0004\uffcb\uffff\uffd5\uffc4\u0008\uffc3\u0002\uffd5\uffc1\u0005\uffbf\ufffe\uffbf\uffc2\ufffe\uffb6"
                .equals(new String(waduheck));
    }

    public static void main(String... args) {
        if (args.length != 1) {
            System.out.println(":BANANA MAN:");
            System.exit(1);
        }

        if (check_flag(args[0]))
            System.out.println("Huh. You Are A Genius.");
        else
            System.out.println("Wadu heck? No.");
    }
}