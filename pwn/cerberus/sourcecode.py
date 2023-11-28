import re

def valid(spell):
	if re.match(".*flag.*", spell):
		return False
	else:
		return True

if __name__=="__main__":
	spell = input('Say the words: ').lower()
	if valid(spell):
		try:
			eval(f"print({spell})")
		except Exception:
			print("See ya next time!")
	else:
		print("Nice try")